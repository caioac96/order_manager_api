import express from 'express';

import env from './config/env.js';
import routes from './infrastructure/http/routes.js';
import logger from './utils/logger.js';
import { serverConnections } from './container.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/health', (req, res) => {
    logger.info('Server running!');
    res.status(200).json({ status: 'Server running!' });
});

async function startServer() {
    try {
        await serverConnections();
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