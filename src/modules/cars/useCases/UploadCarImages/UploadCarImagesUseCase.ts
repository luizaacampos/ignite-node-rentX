import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarImagesRepository")
        private CarImagesRepository: ICarImagesRepository
    ) {}
    async execute({car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.CarImagesRepository.create(car_id, image);
        })
    }
}

export { UploadCarImagesUseCase }