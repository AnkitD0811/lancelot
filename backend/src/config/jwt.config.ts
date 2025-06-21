export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'default_dev_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});