import logger from './utils/logger.js';

export const ErrorHandler = (fun)=> {
    return (req , res, next)=> {
        Promise.resolve(fun(req , res ,next)).catch((err) => {
            logger.error(`Error in ${req.method} ${req.originalUrl}: ${err.message}`);
            next(err);
        });
    }
}

export class SendError extends Error {
    constructor(status , message) {
        super(message)
        this.status = status
    }
}