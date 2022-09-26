import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.cmlvfw3.mongodb.net/`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const MICROSERVICE_PORT = process.env.MICROSERVICE_PORT ? Number(process.env.MICROSERVICE_PORT) : 3003;
const MICROSERVICE_URL = process.env.MICROSERVICE_URL || '';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    microservice: {
        url: MICROSERVICE_URL + ":" + MICROSERVICE_PORT
    }
};
