import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import createError from 'fastify-error';
import { FromSchema } from 'json-schema-to-ts';
import config from '../config';
import { verify } from '../token';

const SECRET = process.env.SECRET || config.DEFAULT_SECRET;
const EmptyPayload = createError('400', 'empty payload');

const verifyHeadersSchema = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string',
      pattern: '^(?i)Bearer *'
    }
  },
  required: ['authorization']
} as const;

const verifyResponseSchema = {
  200: {
    type: 'object',
    properties: {
      payload: {
        type: 'object'
      }
    }
  }
};

async function verifyRoutes (fastify: FastifyInstance, opts: RouteShorthandOptions) {
  fastify.get<{Headers: FromSchema<typeof verifyHeadersSchema>}>('/verify', {
    ...opts,
    preHandler: async (request) => {
      const token = request.headers.authorization.split(' ')[1];
      const payload = await verify(token, SECRET);
      if (payload == null) {
        throw new EmptyPayload();
      }
      if (payload instanceof Error) {
        throw payload;
      }
    },
    schema: {
      response: verifyResponseSchema
    }
  }, async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];
    const payload = await verify(token, SECRET);
    return reply
      .code(200)
      .type('application/json;charset=utf-8')
      .send({
        payload
      });
  });
}

export default verifyRoutes;
