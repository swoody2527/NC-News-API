const express = require("express")
const app = express()
const { getTopics, getEndpoints } = require("./controllers/app.controllers.js")

app.get("/api/topics", getTopics)

app.get("/api", getEndpoints)

module.exports = { app }