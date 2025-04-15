const fs = require('fs');
const path = require('path');

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
const LOG_FILE = path.resolve('logs', `test-log-${new Date().toISOString().slice(0,10)}.log`);

function ensureLogDir() {
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function logToFile(level, message) {
  ensureLogDir();
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`);
}

const logger = {
  log: (message) => logToFile('info', message),
  debug: (message) => logToFile('debug', message),
  info: (message) => logToFile('info', message),
  warn: (message) => logToFile('warn', message),
  error: (message) => logToFile('error', message),
};

module.exports = logger;
