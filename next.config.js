/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const validateEnv = require('./validateEnv');
const withNextIntl = require('next-intl/plugin')();

// Execute environment validation
validateEnv();

module.exports = withNextIntl({
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  }),
  experimental: {
    serverActions: true,
  },
});
