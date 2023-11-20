const errorHandler = async (error, req, res, next) => {
  console.log(error);

  let statusCode = 0;
  let message = "";

  switch (error.name) {
    case "FieldRequired":
      statusCode = 400;
      message = "Every field is required";
      break;
    case "NotFound":
      statusCode = 404;
      message = "Data not found";
      break;
    case "NotUnique":
      statusCode = 400;
      message = "Email is not unique";
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
