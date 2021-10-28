import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
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

        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

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