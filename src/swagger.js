import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Manager API",
            version: "1.0.0",
            description: "Order Manager API - Documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/infrastructure/http/routes.js"]
};

export const swaggerSpec = swaggerJsdoc(options);