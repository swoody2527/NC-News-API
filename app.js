const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())

const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchVotesByArticleId,
  deleteCommentByCommentId,
  getAllUsers
} = require("./controllers/app.controllers.js");
const {
  handleCustomErrors,
  handlePSQLError,
  handle404Error,
  handle500Errors,
} = require("./errors/index.js");
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/users", getAllUsers)

app.post(`/api/articles/:article_id/comments`, postCommentByArticleId);

app.patch("/api/articles/:article_id", patchVotesByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.use(handlePSQLError);

app.use(handleCustomErrors);

app.use(handle500Errors);

module.exports = { app };
