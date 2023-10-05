const { fetchTopics, fetchEndpoints, fetchArticleById, fetchArticles, fetchCommentsByArticleId, updateVotesByArticleId } = require("../models/app.models.js")


exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch((err) => {
        next(err)
    })
}

exports.getEndpoints = (req, res, next) => {
    fetchEndpoints()
    .then((endpoints) => res.status(200).send({ endpoints }))
    .catch((err) => {
        next(err)
    })
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })})
    .catch((err) => {
        next(err)
    }) 
}

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => res.status(200).send({ articles }))
    .catch((err) => {
        next(err)
    })
}

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    fetchCommentsByArticleId(article_id)
    .then((comments) => res.status(200).send({ articleComments: comments }))
    .catch((err) => {
        next(err)
    })
}

exports.patchVotesByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const votesToIncrement = req.body.inc_votes
    updateVotesByArticleId(article_id, votesToIncrement).then((updatedArticle) => res.status(200).send({updatedArticle}))
    .catch((err) => {
        next(err)
    })
}