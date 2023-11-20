function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.response.status).json({message : err.response.statusText});
}

module.exports = errorHandler;
