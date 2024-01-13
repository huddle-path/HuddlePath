const { cleanEnv, makeValidator } = require('envalid');

const nonEmptyStr = makeValidator((value) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('Expected a non-empty string');
  }
  return value;
});
function validateEnv() {
  cleanEnv(process.env, {
    JWT_SECRET: nonEmptyStr(),
    MONGODB_URI: nonEmptyStr(),
  });
}

module.exports = validateEnv;
