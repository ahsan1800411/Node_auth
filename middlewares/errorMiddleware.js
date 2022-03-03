module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    sucess: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
