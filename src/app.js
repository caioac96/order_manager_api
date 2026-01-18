import express from 'express';
import mongoose from 'mongoose';

import env from './config/env.js';
import routes from './infrastructure/http/routes.js';
import RabbitPublisher from './infrastructure/messaging/RabbitPublisher.js';
import logger from './utils/logger.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/health', (req, res) => {
    logger.info('Server running!');
    res.status(200).json({ status: 'Server running!' });
});

async function startServer() {
    try {
        await mongoose.connect(env.mongo.url, {
            serverSelectionTimeoutMS: 5000
        });
        logger.info('MongoDB connected');

        // TODO: Ajustar conexão com rabbit
        // const rabbitPublisher = new RabbitPublisher();
        // await rabbitPublisher.connect(env.rabbitmq.url);
        // logger.info('RabbitMQ connected');

        // app.locals.eventPublisher = rabbitPublisher;

        app.listen(env.port, () => {
            logger.log(`Running on port: ${env.port}`);
        });
    } catch (error) {
        logger.error('Error run application.', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    logger.info('Closing application...');
    await mongoose.disconnect();
    process.exit(0);
});

startServer();

export default app;