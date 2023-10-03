
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
    console.log(article_id)
    
    return database.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
        if (!article.rows.length) {
            return Promise.reject({
                status: 404,
                msg: "No article found with that id"
            })
        }
        console.log(article)
        return article.rows[0]
    })
}