import winston from "winston";

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
    ]
})