import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fake/FakeRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayPlus24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        fakeRentalsRepository = new FakeRentalsRepository();
        fakeCarsRepository = new FakeCarsRepository()
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            fakeRentalsRepository, 
            dayjsDateProvider, 
            fakeCarsRepository
        );
    });

    it("shoud be able to create a new rental", async () => {
        const car = await fakeCarsRepository.create({
            name: "test",
            description: "test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 500,
            category_id: "1234",
            brand: "test"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayPlus24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it("shoud not be able to create a new rental to a user with a open rent", async () => {
        await fakeRentalsRepository.create({
            car_id: "12345",
            user_id: "654321",
            expected_return_date: dayPlus24Hours
        });

        await expect(createRentalUseCase.execute({
            car_id: "54321",
            user_id: "654321",
            expected_return_date: dayPlus24Hours,
        })
        ).rejects.toEqual(new AppError("user has a rental in progress"));

    });

    it("shoud not be able to create a new rental on a car with a open rent", async () => {
        await fakeRentalsRepository.create({
            car_id: "12345",
            user_id: "654321",
            expected_return_date: dayPlus24Hours
        });
        
        await expect(createRentalUseCase.execute({
                car_id: "12345",
                user_id: "12346",
                expected_return_date: dayPlus24Hours,
            })
        ).rejects.toEqual(new AppError("this car is unavailable!"));
    });

    it("shoud not be able to create a new rental that lasts less than 24 hours", async () => {
        await expect(createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Rental should last at least 24 hours!"));
    });
});