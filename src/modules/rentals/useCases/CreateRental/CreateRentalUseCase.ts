import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute({ 
        user_id, 
        car_id, 
        expected_return_date 
    }: IRequest): Promise<Rental> {
        const minimalHours = 24;
        const carIsRented = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carIsRented) {
            throw new AppError("this car is unavailable!");
        }

        const userIsRenting = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (userIsRenting) {
            throw new AppError("user has a rental in progress")
        }
 
        const dateNow = this.dateProvider.DateNow();
        const compare = this.dateProvider.compareHours(dateNow, expected_return_date);
        if (compare < minimalHours) {
            throw new AppError("rental should last at least 24 hours!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        })

        return rental;


    }
}

export { CreateRentalUseCase }