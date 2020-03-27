const client = require('./webpack.client');
const server = require('./webpack.server');
module.exports = (env, argv) => [client(env, argv), server(env, argv)];