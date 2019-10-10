const winston = require('winston');
const os = require('os');
const config = require('../../config/config');

const {
  combine, timestamp, label, printf,
} = winston.format;

const level = config.logLevel || 'debug';

const myFormat = printf((options) => {
  const error = options.err && options.err instanceof Error ? options.err.stack.replace(/\s\s+/g, ' ') : '';
  const data = options.data ? JSON.stringify(options.data) : '';
  return `${options.timestamp} [${os.hostname()}] ${options.level.toUpperCase()}: ${options.message} ${data}${error}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        label({ label: config.app.name }),
        timestamp(),
        myFormat,
      ),
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp() {
        return Date.now();
      },
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

module.exports = logger;
