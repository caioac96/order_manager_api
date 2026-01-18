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
        user: required('MONGO_USER'),
        pwd: required('MONGO_PASSWORD'),
        host: required('MONGO_HOST')
    },
    rabbitmq: {
        user: required('RABBIT_USER'),
        pwd: required('RABBIT_PASSWORD'),
        host: required('RABBIT_HOST')
    }
};

export default env;