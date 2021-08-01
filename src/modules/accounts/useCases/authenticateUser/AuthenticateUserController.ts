import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUsecase } from "./AuthenticateUserUsecase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUsecase);

        const token = await authenticateUserUseCase.execute({ password, email });

        return response.json(token);
    }
}

export { AuthenticateUserController }