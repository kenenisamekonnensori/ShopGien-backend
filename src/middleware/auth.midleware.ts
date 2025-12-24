import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../infrastructure/security/jwt';


export async function requereAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = verifyAccessToken(token);
            (req as any).userId = payload.userId;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
}