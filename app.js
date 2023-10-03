const express = require("express")
const app = express()
const { getTopics, getEndpoints, getArticleById, getArticles } = require("./controllers/app.controllers.js")
const { handleCustomErrors, handlePSQLError, handle404Error } = require("./errors/index.js")
app.use(express.json())

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getArticles)

app.use(handlePSQLError)

app.use(handleCustomErrors)

module.exports = { app }