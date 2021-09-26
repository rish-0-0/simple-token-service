import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import generateRoutes from './generate.router';
import verifyRoutes from './verify.router';
import refreshRoutes from './refresh.router';
import googleAuthVerify from '../prevalidation';

function routes (instance: FastifyInstance, opts: RouteShorthandOptions) {
  instance.addHook('preValidation', googleAuthVerify);
  instance.register(generateRoutes, opts);
  instance.register(verifyRoutes, opts);
  instance.register(refreshRoutes, opts);
}

export default routes;
