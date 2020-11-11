const { createLogger } = require('winston');

const { configConsole, configFile } = require('./configLogger');
const getLogRequest = require('../utils/getLogRequest');
const { handleError } = require('../common/error');

const winstonConsole = createLogger(configConsole);
const winstonFile = createLogger(configFile);

const eventLogger = (req, res, next) => {
  const { toConsole, toFile } = getLogRequest(req);

  winstonConsole.log('info', toConsole);
  winstonFile.log('info', toFile);
  next();
};
const processErrorLogger = (message, errorType) => {
  const time = new Date().toUTCString();
  const errString = `${time} | ${errorType}: ${message}`;

  winstonConsole.log('error', errString);
  winstonFile.log('error', errString);
  return winstonFile;
};
const errorLogger = (err, req, res) => {
  const { statusCode, message } = handleError(err, res);

  const level = statusCode >= 400 && statusCode < 500 ? 'warn' : 'error';

  const { toFile } = getLogRequest(req);
  const time = new Date().toUTCString();
  const errString = `${time} | Error ${statusCode}: ${message}`;
  winstonConsole.log(level, errString);
  winstonFile.log(level, `${errString} | Request: ${toFile}`);
};

module.exports = { eventLogger, errorLogger, processErrorLogger };
