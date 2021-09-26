import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import generateRoutes from './generate.router';
import verifyRoutes from './verify.router';
import refreshRoutes from './refresh.router';
import googleAuthVerify from '../prevalidation';

async function routes (instance: FastifyInstance, opts: RouteShorthandOptions) {
  instance.addHook('preValidation', googleAuthVerify);
  instance.register(generateRoutes);
  instance.register(verifyRoutes);
  instance.register(refreshRoutes);
}

export default routes;
