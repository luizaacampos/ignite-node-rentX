import { FakeRentalsRepository } from '@modules/rentals/repositories/fake/FakeRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;

describe("Create Rental", () => {
    const dayPlus24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        fakeRentalsRepository = new FakeRentalsRepository()
        createRentalUseCase = new CreateRentalUseCase(fakeRentalsRepository);
    });

    it("shoud be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "54321",
            expected_return_date: dayPlus24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it("shoud not be able to create a new rental to a user with a open rent", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54327",
                expected_return_date: dayPlus24Hours,
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayPlus24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("shoud not be able to create a new rental on a car with a open rent", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayPlus24Hours,
            });
            
            await createRentalUseCase.execute({
                user_id: "12346",
                car_id: "54321",
                expected_return_date: dayPlus24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shoud not be able to create a new rental that lasts less than 24 hours", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});