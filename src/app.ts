import * as Fastify from 'fastify';
import googleAuthVerify from './prevalidation';
import generateRoutes from './routes/generate.router';
import refreshRoutes from './routes/refresh.router';
import verifyRoutes from './routes/verify.router';
import errorHandler from './utils/error-handler';
import swagger from 'fastify-swagger';
import packageJSON from '../package.json';

async function app () {
  const instance: Fastify.FastifyInstance = Fastify.fastify();
  instance.setErrorHandler(errorHandler);
  instance.register(swagger, {
    routePrefix: '/',
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
  instance.addHook('preValidation', googleAuthVerify);
  instance.register(generateRoutes);
  instance.register(verifyRoutes);
  instance.register(refreshRoutes);

  return instance;
}

export default app;
