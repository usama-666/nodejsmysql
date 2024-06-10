class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.data = null;
    this.error = errors;
    // if (stack) {
    //   this.stack = stack;
    // } else {
    //   this.captureStackTrace(this, this.constructor);
    // }
  }
}

module.exports = ApiError;
