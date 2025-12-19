import {Response, Request, NextFunction } from "express";

export class AppError extends Error {
    statusCode: number;
    isOperational: true;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err.statusCode || 500;
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }


    res.status(400).json({
        message: err.message || "Internal Server Error",
    });
}