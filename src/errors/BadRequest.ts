class BadRequest extends Error {
  statusCode: number;
  constructor (message: string | undefined) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = 400;
  }
}

export default BadRequest;
