import mongoose from 'mongoose';
import env from './config/env.js';
import RabbitPublisher from './infrastructure/messaging/RabbitPublisher.js';
import logger from './utils/logger.js';
import app from './app.js';

export const rabbitPublisher = new RabbitPublisher();

export async function serverConnections() {
    const mongoUri = `mongodb+srv://${env.mongo.user}:${env.mongo.pwd}@${env.mongo.host}`;

    const rabbitUri = `amqps://${env.rabbitmq.user}:${env.rabbitmq.pwd}@${env.rabbitmq.host}`;

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    logger.info('MongoDB connected');

    await rabbitPublisher.connect(rabbitUri);
    logger.info('RabbitMQ connected');

    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}