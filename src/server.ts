import http from 'http';
import { app } from './app';
import { conectDatabase, disconnectDatabase } from './config/db';
import { env } from './config/env';
import logger from './config/logger';

const PORT = env.PORT;

async function start() {
  try {
    // Connect to database before starting the server
    await conectDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT} — env=${env.NODE_ENV}`);
    });

    // Graceful shutdown
    const shutdown = async (signal?: string) => {
      try {
        logger.info(`Received ${signal ?? 'shutdown'} — closing server`);
        server.close(async (err) => {
          if (err) {
            logger.error('Error closing server', err as any);
            process.exit(1);
          }

          await disconnectDatabase();
          logger.info('Shutdown complete');
          process.exit(0);
        });

        // In case server.close hangs, force exit after timeout
        setTimeout(() => {
          logger.warn('Forcing shutdown after timeout');
          process.exit(1);
        }, 30000).unref();
      } catch (err) {
        logger.error('Error during shutdown', err as any);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception', err as any);
      shutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection', reason as any);
      shutdown('unhandledRejection');
    });
  } catch (err) {
    logger.error('Failed to start application', err as any);
    process.exit(1);
  }
}

start();

