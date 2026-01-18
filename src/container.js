import mongoose from 'mongoose';
import env from './config/env.js';
import RabbitPublisher from './infrastructure/messaging/RabbitPublisher.js';
import logger from './utils/logger.js';

export const rabbitPublisher = new RabbitPublisher();

export async function serverConnections() {
    await mongoose.connect(env.mongo.url, { serverSelectionTimeoutMS: 5000 });
    logger.info('MongoDB connected');

    await rabbitPublisher.connect(env.rabbitmq.url);
    logger.info('RabbitMQ connected');
}