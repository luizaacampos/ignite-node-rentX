import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject(RentalsRepository)
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.fidnByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };