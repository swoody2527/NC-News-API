
const database = require("../db/connection.js")
const { readFile } = require("fs/promises")

exports.fetchTopics = () => {
    return database.query("SELECT * FROM topics;")
    .then((result) => {
        return result.rows
    })
}

exports.fetchEndpoints = () => {
    return readFile("endpoints.json", "utf-8")
    .then((endpoints) => {
        return endpoints
    })
}

exports.fetchArticleById = (article_id) => { 
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

exports.fetchArticles = () => {
    return database.query(`SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, 
    COUNT(comments.comment_id) AS comment_count  
    FROM articles JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.author, title, articles.article_id ORDER BY articles.created_at DESC;`)
    .then((articles) => {
        return articles.rows
    })
    
}