require('dotenv');
global.config = require('./src/config/config');
const http = require('http');
const log = require('./src/services/log.service');
const app = require('./src/app');
require('./src/config/db');

/**
 * Get port from environment and store in Express.
 */
const port = config.app.port || 3000;
app.set('port', port);

const startServer = (createdServer) => {
  return createdServer.listen(config.app.port, () => {
    log.info(`User listening over HTTP on port ${port}`);
  });
};

/**
 * Create HTTP server.
 */

const server = startServer(http.createServer(app));
server.setTimeout(360000);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('error', onError);
