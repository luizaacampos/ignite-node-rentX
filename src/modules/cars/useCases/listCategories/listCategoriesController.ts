import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategorieUseCase";
import { container } from 'tsyringe';

class ListCategoriesController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoriesUseCase.execute();

    return response.json(all)
    }
}

export { ListCategoriesController }