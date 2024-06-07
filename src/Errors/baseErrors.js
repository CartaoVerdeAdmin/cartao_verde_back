export class AppError extends Error {
  constructor(name, httpCode, message, isOperational) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super("ValidationError", 403, message, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super("Unauthorized", 401, message, true);
  }
}
export class NotFoundError extends AppError {
  constructor(message) {
    super("NotFound", 404, message, true);
  }
}
export class InternalServerError extends AppError {
  constructor(message = "Something went wrong") {
    super("InternalServerError", 500, message, false);
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super("Forbidden", 403, message, true);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super("ValidationError", 409, message, true);
  }
}

export class BadRequest extends AppError {
  constructor(message) {
    super("BadRequest", 400, message, true);
  }
}
