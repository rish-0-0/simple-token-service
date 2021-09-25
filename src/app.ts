import * as Fastify from 'fastify';

async function app () {
  const instance: Fastify.FastifyInstance = Fastify.fastify();

  return instance;
}

export default app;
