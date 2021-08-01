import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUsecase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            name,
            email,
            password,
            driverslicense
         } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
            driverslicense
        })

        return response.status(201).send();
    }
}

export { CreateUserController };