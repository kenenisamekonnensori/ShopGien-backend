import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../../application/auth.usecase";
import { userInfo } from "os";


export async function register(req: Request, res: Response, next: NextFunction){

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const result = await AuthUseCase.register(email, password);

        return res.status(201).json({
            user: {
                id: result.newUser.id,
                email: result.newUser.email,
                createdAt: result.newUser.createdAt,
            },
            accessToken: result.accessToken,
        });
    } catch (error) {
        next(error);
    }
}