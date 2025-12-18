import { Request, Response, NextFunction } from 'express';
import { SearchUseCase } from '../application/search.usecase';

export async function saerchByImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl || typeof imageUrl !== 'string'){
            return res.status(400).json({ error: 'Invalid or missing "imageUrl" in request body' });
        }

        const result = await SearchUseCase.searchByImage(imageUrl);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}