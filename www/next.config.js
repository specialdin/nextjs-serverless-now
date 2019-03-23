const withTypescript = require('@zeit/next-typescript');
const webpack = require('webpack');

const nextConfig = {
  target: 'serverless'
}

module.exports = withTypescript(nextConfig);
