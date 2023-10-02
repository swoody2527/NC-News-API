const { fetchTopics } = require("../models/app.models.js")


exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch((err) => {
        console.log(err)
        console.log("made uit here")
    })
}