import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionUseCase } from './DevolutionUseCase';

class DevolutionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { id: user_id } = request.user;

        const devolutionUseCse = container.resolve(DevolutionUseCase);

        const finalRental = await devolutionUseCse.execute({
            id,
            user_id
        });

        return response.status(200).json(finalRental);
    }

}

export { DevolutionController };