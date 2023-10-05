
const database = require("../db/connection.js")
const { readFile } = require("fs/promises")

const fetchTopics = () => {
    return database.query("SELECT * FROM topics;")
    .then((result) => {
        return result.rows
    })
}

const fetchEndpoints = () => {
    return readFile("endpoints.json", "utf-8")
    .then((endpoints) => {
        return endpoints
    })
}

const fetchArticleById = (article_id) => {
    return database.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
        if (!article.rows.length) {
            return Promise.reject({
                status: 404,
                msg: "No article found with that id"
            })
        }
        return article.rows[0]
    })
}

const fetchArticles = () => {
    return database.query(`SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, 
    COUNT(comments.comment_id) AS comment_count  
    FROM articles JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.author, title, articles.article_id ORDER BY articles.created_at DESC;`)
    .then((articles) => {
        return articles.rows
    })
    
}

const fetchCommentsByArticleId = (article_id) => {
    return fetchArticleById(article_id) //CHECKS IF ARTICLE EXISTS
    .then((response) => {
        return database.query(`SELECT comment_id, articles.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM comments 
    JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 ORDER BY comments.created_at DESC;`, [article_id])
    })
    .then((comments) => {
        return comments.rows
    })
}

const insertCommentByArticleId = (article_id, commentToPost) => {
    return fetchArticleById(article_id)
    .then(() => {
        const {username, body} = commentToPost
        if (!username || !body) {
            return Promise.reject({
                status: 400,
                msg: "Invalid comment to post format"
            })
        }
        return database.query(`INSERT INTO comments 
        (author, body, article_id)
        VALUES
        ($1, $2, $3) RETURNING *`, [username, body, article_id])
    })
    .then((returnedComment) => {
        return returnedComment.rows[0]

    })
}

module.exports = { fetchTopics, fetchEndpoints, fetchArticles, fetchCommentsByArticleId, fetchArticleById, insertCommentByArticleId}