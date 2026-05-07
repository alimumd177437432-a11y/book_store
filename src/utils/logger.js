import winston from "winston";
import "winston-daily-rotate-file";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
  ),
);

const errorRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "error",
});

const combinedRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "7d",
});

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [errorRotateTransport, combinedRotateTransport],
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  );
}
export default logger;
