import { FastifyReply, FastifyRequest } from 'fastify';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

async function errorHandler (error: Error | VerifyErrors, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof TokenExpiredError) {
    return reply
      .code(401)
      .send({
        error: error.message,
        name: error.name,
        expiredAt: error.expiredAt
      });
  }
  if (error instanceof JsonWebTokenError) {
    return reply.code(401)
      .send({
        error: error.message,
        name: error.name
      });
  }
  if (error instanceof NotBeforeError) {
    return reply.code(401)
      .send({
        error: error.message,
        name: error.name,
        date: error.date
      });
  }
  const { name, message } = error;
  return reply.code(500)
    .send({
      name,
      message
    });
}

export default errorHandler;
