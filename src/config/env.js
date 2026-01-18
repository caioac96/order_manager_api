import 'dotenv/config';

const required = (key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment key: ${key}`);
    }
    return process.env[key];
};

const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    mongo: {
        url: required('MONGO_URL')
    },
    rabbitmq: {
        url: required('RABBITMQ_URL')
    }
};

export default env;