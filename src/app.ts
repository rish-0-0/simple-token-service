import * as Fastify from 'fastify';
import generateRoutes from './routes/generate.router';
import refreshRoutes from './routes/refresh.router';
import verifyRoutes from './routes/verify.router';
import errorHandler from './utils/error-handler';

async function app () {
  const instance: Fastify.FastifyInstance = Fastify.fastify();
  instance.setErrorHandler(errorHandler);

  instance.register(generateRoutes);
  instance.register(verifyRoutes);
  instance.register(refreshRoutes);

  return instance;
}

export default app;
