import { FastifyRequest, FastifyReply } from 'fastify';
import { OAuth2Client } from 'google-auth-library';
import { FromSchema } from 'json-schema-to-ts';

const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

const headersSchema = {
  type: 'object',
  properties: {
    'x-id-token': {
      type: 'string'
    }
  },
  required: ['x-id-token']
} as const;

export default async function googleAuthVerify
(request: FastifyRequest<{Headers:FromSchema<typeof headersSchema>}>, reply: FastifyReply) {
  const googleToken: string = request.headers['x-id-token'];
  try {
    await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID
    });
    return;
  } catch (e) {
    return reply
      .type('application/json;charset=utf-8')
      .code(401)
      .send({
        message: 'invalid id token'
      });
  }
}
