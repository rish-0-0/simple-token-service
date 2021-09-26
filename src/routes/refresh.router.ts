import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import config from '../config';
import BadRequest from '../errors/BadRequest';
import { decode, generate } from '../token';

const SECRET = process.env.SECRET || config.DEFAULT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN || config.DEFAULT_EXPIRY;

const refreshHeadersSchema = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string',
      pattern: '^(?i)Bearer *'
    }
  },
  required: ['authorization']
} as const;

const refreshResponseSchema = {
  200: {
    type: 'object',
    properties: {
      access_token: { type: 'string' },
      token_type: { type: 'string', enum: ['Bearer'] },
      expires_in: { type: 'number' }
    }
  }
};

async function refreshRoutes (fastify: FastifyInstance, opts: RouteShorthandOptions) {
  fastify.get<{Headers: FromSchema<typeof refreshHeadersSchema>}>('/verify', {
    ...opts,
    schema: {
      response: refreshResponseSchema
    }
  }, async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];
    const payload = decode(token)?.payload;
    if (payload == null) {
      throw new BadRequest('bad token');
    }
    const refreshToken = await generate(payload, SECRET, { expiresIn: EXPIRES_IN });
    return reply
      .code(200)
      .headers({
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-store',
        Pragma: 'no-cache',
        'x-auth-token': refreshToken
      })
      .send({
        access_token: refreshToken,
        token_type: 'Bearer',
        expires_in: EXPIRES_IN
      });
  });
}

export default refreshRoutes;
