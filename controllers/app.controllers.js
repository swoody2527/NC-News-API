const { fetchTopics, fetchEndpoints, fetchArticleById } = require("../models/app.models.js")


exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch((err) => {
    })
}

exports.getEndpoints = (req, res, next) => {
    fetchEndpoints()
    .then((endpoints) => res.status(200).send({ endpoints }))
    .catch((err) => {
    })
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        if (!article.length) {
            return Promise.reject({
                status: 400,
                msg: "No article found with that id"
            })
        }
        res.status(200).send({ article })})
    .catch((err) => {
        next(err)
    }) 
}