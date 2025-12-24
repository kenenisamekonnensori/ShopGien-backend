import * as jwt from 'jsonwebtoken';


export interface jwtPayload {
    userId: string;
}

export function signAccessToken(payLoad: jwtPayload): string {
    return jwt.sign(payLoad, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    } as jwt.SignOptions);
}