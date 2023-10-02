const database = require("../db/connection.js")

exports.fetchTopics = () => {
    return database.query("SELECT * FROM topics;")
    .then((result) => {
        return result.rows
    })


}