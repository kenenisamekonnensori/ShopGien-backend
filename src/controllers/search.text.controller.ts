import { Request, Response, NextFunction } from 'express';
import { SearchUseCase } from '../application/search.usecase';

export async function searchByText(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { message} = req.body;

        if (!message || typeof message !== 'string'){
            return res.status(400).json({ error: 'Invalid or missing "message" in request body' });
        }

        const result = await SearchUseCase.searchByText(message);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}