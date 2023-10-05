const { log } = require("console");
const database = require("../db/connection.js");
const { readFile } = require("fs/promises");

const fetchTopics = () => {
  return database.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

const fetchEndpoints = () => {
  return readFile("endpoints.json", "utf-8").then((endpoints) => {
    return endpoints;
  });
};
const fetchArticleById = (article_id) => {
  return database
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
      if (!article.rows.length) {
        return Promise.reject({
          status: 404,
          msg: "No article found with that id",
        });
      }
      return article.rows[0];
    });
};

const fetchArticles = () => {
  return database
    .query(
      `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, 
    COUNT(comments.comment_id) AS comment_count  
    FROM articles JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.author, title, articles.article_id ORDER BY articles.created_at DESC;`
    )
    .then((articles) => {
      return articles.rows;
    });
};

const fetchCommentsByArticleId = (article_id) => {
  return fetchArticleById(article_id) //CHECKS IF ARTICLE EXISTS
    .then((response) => {
      return database.query(
        `SELECT comment_id, articles.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM comments 
    JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 ORDER BY comments.created_at DESC;`,
        [article_id]
      );
    })
    .then((comments) => {
      return comments.rows;
    });
};

const insertCommentByArticleId = (article_id, commentToPost) => {
  return fetchArticleById(article_id)
    .then(() => {
      const { username, body } = commentToPost;
      if (!username || !body) {
        return Promise.reject({
          status: 400,
          msg: "Invalid comment to post format",
        });
      }
      return database.query(
        `INSERT INTO comments 
        (author, body, article_id)
        VALUES
        ($1, $2, $3) RETURNING *`,
        [username, body, article_id]
      );
    })
    .then((returnedComment) => {
      return returnedComment.rows[0];
    });
};
const updateVotesByArticleId = (article_id, votesToIncrement) => {
  if (!votesToIncrement) {
    return Promise.reject({
      status: 400,
      msg: "invalid patch format for updating votes",
    });
  }
  return fetchArticleById(article_id).then(() => {
    return database
      .query(
        `UPDATE articles SET votes = votes + $1 
        WHERE article_id = $2 RETURNING *;`,
        [votesToIncrement, article_id]
      )
      .then((updatedArticle) => {
        return updatedArticle.rows[0];
      });
  });
};

const removeCommentByCommentId = (comment_id) => {
  return database.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
  .then((comments) => {
    if (!comments.rows.length) {
      return Promise.reject({
        status: 404,
        msg: "no comment with that id exists"
      })
    } else {
      return database.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [comment_id])
      .then((response) => {return response.rows[0]})
    }
  })
  }

const fetchAllUsers = () => {
  return database.query("SELECT username, name, avatar_url FROM users;")
  .then((allUsers) => {return allUsers.rows})
}

module.exports = {
  fetchTopics,
  fetchEndpoints,
  fetchArticles,
  fetchCommentsByArticleId,
  fetchArticleById,
  insertCommentByArticleId,
  updateVotesByArticleId,
  removeCommentByCommentId,
  fetchAllUsers
};
