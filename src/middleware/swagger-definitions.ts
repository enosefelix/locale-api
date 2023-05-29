import dotenv from 'dotenv';
dotenv.config();

const WEB_HOST = process.env.WEB_HOST

export const swaggerDefinition = {
    swaggerDefinition: {
        info: {
            title: 'API Docs',
            version: '1.0.0',
            description: 'API Documentation',
        },
        host: WEB_HOST,
        basePath: '/',
        securityDefinitions: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        },
    },
    apis: ['src/docs/swagger-docs.ts'],
};