import mongoose from 'mongoose';
import logger from './logger';
import { env } from './env';

let isConnected = false;

export async function conectDatabase(): Promise<void> {
    if (isConnected){
        return;
    }

    const opt: mongoose.ConnectOptions = {}

    const maxTries = 5;
    let attemt = 0;

    while (!isConnected && attemt < maxTries){
        try {
            attemt += 1;
            logger.info(`Connencting to database (attempt ${attemt})`)
            await mongoose.connect(env.MONGODB_URI, opt);
            isConnected = true
            logger.info('mongoDB connected')
            break
        } catch (error) {
            logger.error(`mongoDB connection faild: (attempt ${attemt})`, error as any)
            const delay = Math.min(1000 * Math.pow(2, attemt), 30000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

export async function disconnectDatabase(): Promise<void> {
    if (!isConnected){
        return;
    }

    try {
        await mongoose.disconnect();
        isConnected = false;
        logger.info('mongoDB disconnected')
    } catch (error) {
        logger.error('Error disconnecting mongoDB', error as any)
    }
}