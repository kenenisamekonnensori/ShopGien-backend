
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import createLogger from 'morgan';
import { env } from './config/env';
import logger from './config/logger';

export const app = express();

// Basic middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// API versioning prefix — put your route files under /api/v1
app.use('/api/v1', (req: Request, res: Response, next: NextFunction) => {
  // Example middleware that could attach request-id, user, etc.
  next();
});

// Example placeholder route; replace with your routers
app.get('/api/v1/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error', err);
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error',
  } as Record<string, unknown>;

  if (env.NODE_ENV === 'development') payload.stack = err.stack;

  res.status(status).json(payload);
});

