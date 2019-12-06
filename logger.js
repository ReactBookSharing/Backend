const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;

const myFormat = printf(info => {
  return `${new Date().toLocaleString()} ${info.message.viewsName} ${info.message.data}`;
});

const logger = createLogger({
  format: combine(
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'booksharing.log' })
  ]
});

module.exports = logger;