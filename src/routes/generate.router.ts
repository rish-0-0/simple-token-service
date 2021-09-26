import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { generate } from '../token';
import config from '../config';

const SECRET = process.env.SECRET || config.DEFAULT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN || config.DEFAULT_EXPIRY;

const generateBodySchema = {
  type: 'object',
  properties: {
    payload: {
      type: 'object'
    }
  },
  additionalProperties: false,
  required: ['payload']
} as const;

const generateResponseSchema = {
  200: {
    type: 'object',
    properties: {
      access_token: { type: 'string' },
      token_type: { type: 'string', enum: ['Bearer'] },
      expires_in: { type: 'number' }
    }
  }
};

async function generateRoutes (fastify: FastifyInstance, opts: RouteShorthandOptions) {
  fastify.post<{Body: FromSchema<typeof generateBodySchema>}>(
    '/generate',
    {
      ...opts,
      schema: {
        body: generateBodySchema,
        response: generateResponseSchema
      }
    },
    async (request, reply) => {
      const token = await generate(request.body.payload, SECRET, { expiresIn: EXPIRES_IN });
      if (token == null || token instanceof Error) {
        throw new Error(token?.message ?? 'unable to generate token');
      }
      return reply
        .code(200)
        .headers({
          'Content-Type': 'application/json;charset=utf-8',
          'Cache-Control': 'no-store',
          Pragma: 'no-cache',
          'x-auth-token': token
        })
        .send({
          access_token: token,
          token_type: 'Bearer',
          expires_in: EXPIRES_IN
        });
    }
  );
}

export default generateRoutes;
