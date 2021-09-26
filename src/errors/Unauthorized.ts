class Unauthorized extends Error {
  statusCode: number;
  constructor (message: string | undefined) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = 401;
  }
}

export default Unauthorized;
