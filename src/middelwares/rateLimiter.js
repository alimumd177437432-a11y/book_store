import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: `Too many requests from this IP, please try again after 15 minutes`,
  standardHeaders: true, 
  legacyHeaders: false, 
});

export const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 5, 
  message: `Too many attempts, please try again after an hour`,
});