const errorHandler = async (error, req, res, next) => {
  console.log(error);

  let statusCode = 0;
  let message = "";

  switch (error.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = error.errors[0].message;
      break;
    case "NotFound":
      statusCode = 404;
      message = "Data not found";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
