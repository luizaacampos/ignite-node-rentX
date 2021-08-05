import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { User } from "../modules/accounts/entities/User";
import { UsersRepository } from "../modules/accounts/repositories/implementatios/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(
            token, 
            "007330159ce2d85cd95cadb4c87dd157"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
            if (!user) {
                throw new AppError("user does not exist!", 401)
            }
        
            request.user = {
                id: user_id
            }

        next();
    } catch {
        throw new AppError("invalid token!", 401)
    }

}