export class AppError extends Error {
  constructor(name, httpCode, message, isOperational) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super("NotFound", 404, message, true);
  }
}
