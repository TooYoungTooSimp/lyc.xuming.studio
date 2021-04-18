import winston from "winston";

export function getLogger() {
    return winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
                    }),
                    winston.format.errors({ stack: true }),
                    winston.format.colorize(),
                    winston.format.splat(),
                    winston.format.printf(({ level, message, timestamp }) =>
                        `${timestamp} [${level}] : ${message}`
                    )
                )
            })
        ]
    });
}