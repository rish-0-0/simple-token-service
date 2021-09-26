import * as Fastify from 'fastify';
import errorHandler from './utils/error-handler';
import swagger from 'fastify-swagger';
import packageJSON from '../package.json';
import routes from './routes/index.router';

async function app () {
  const instance: Fastify.FastifyInstance = Fastify.fastify({
    logger: true
  });
  instance.setErrorHandler(errorHandler);
  instance.register(swagger, {
    routePrefix: '/',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Simple Token Service',
        description: 'Token Generate Service with Google Auth',
        version: packageJSON.version
      },
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });
  instance.register(routes, { prefix: '/token' });
  return instance;
}

export default app;
