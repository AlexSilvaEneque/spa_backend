import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) : void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
        return
    }

    console.error(err) // Log the error for debugging purposes

    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
    return 
}