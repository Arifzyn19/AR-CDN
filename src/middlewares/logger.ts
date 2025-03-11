import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

/**
 * Request logger middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();

  // Log request
  logger.http(`${req.method} ${req.originalUrl}`);

  // Log request body in development
  if (
    process.env.NODE_ENV === "development" &&
    req.body &&
    Object.keys(req.body).length > 0
  ) {
    logger.debug("Request Body:", req.body);
  }

  // Create a function to log the response
  const logResponse = () => {
    const duration = Date.now() - start;
    logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    );
  };

  // Log when the request is finished
  res.on("finish", logResponse);

  next();
};

/**
 * Error logger middleware
 */
export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(`${req.method} ${req.originalUrl} ${err.message}`, {
    error: err.stack,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  next(err);
};
