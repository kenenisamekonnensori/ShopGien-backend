
import { createLogger, format, transports } from 'winston';
import { env } from './env';

const logger = createLogger({
  level: env.LOG_LEVEL,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [new transports.Console()],
});

export default logger;

/* --------------------------------------------------------------------------
 * File: .env.example
 * Copy to .env and fill values
 * -------------------------------------------------------------------------*/

// NODE_ENV=development
// PORT=4000
// MONGODB_URI=mongodb://localhost:27017/shopgenie
// CORS_ORIGIN=*
// LOG_LEVEL=debug
