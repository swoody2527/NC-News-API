const { fetchTopics, fetchEndpoints } = require("../models/app.models.js")


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