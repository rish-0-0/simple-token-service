import crypto from 'crypto';
export default {
  DEFAULT_EXPIRY: '10m',
  DEFAULT_SECRET: crypto.randomBytes(10).toString('hex')
};
