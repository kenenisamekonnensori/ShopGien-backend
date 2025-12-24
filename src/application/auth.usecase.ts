import { randomUUID } from "crypto";
import { User } from "../domain/user.entity";
import { hashPassword, verifyPassword } from "../infrastructure/security/password";
import { signAccessToken } from "../infrastructure/security/jwt";



const user = new Map<string, User>();
export class AuthUseCase {
    static async register(email: string, password: string) {
        if (user.has(email)) {
            throw new Error('User already exists');
        }

        const passwordHash = await hashPassword(password);

        const newUser = new User({
            id: randomUUID(),
            email,
            passwordHash,
            createdAt: new Date(),
        });

        user.set(email, newUser);

        const accessToken = signAccessToken({userId: newUser.id});

        return {newUser, accessToken};
    };

    static async login(email: string, password: string) {
        const existingUser = user.get(email);

        if (!existingUser) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await verifyPassword(password, existingUser.passwordHash);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const accessToken = signAccessToken({userId: existingUser.id});

        return {existingUser, accessToken};
    }
}