exports.handleCustomErrors = ((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg })
    } else next(err)
  });

exports.handlePSQLError = ((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({msg: "invalid input for article_id"})
  } else next(err)
})