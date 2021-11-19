import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { FakeSpecificationRepository } from "@modules/cars/repositories/fakes/FakeSpecificationRepository";
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationRepository: FakeSpecificationRepository;

describe("Create Car Specification", () => {
    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository();
        fakeSpecificationRepository = new FakeSpecificationRepository();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            fakeCarsRepository,
            fakeSpecificationRepository
        );
    })
    it("Should be able to add a new specification to a car", async () => {
        const car = await fakeCarsRepository.create({
            name: "test car",
            description: "this is a test car",
            daily_rate: 50,
            license_plate: "DFR-48750",
            fine_amount: 40,
            brand: "test brand",
            category_id: "cetegory",
        })

        const specification = await fakeSpecificationRepository.create({
            description: "test",
            name: "test",
        })

        const specifications_id = [specification.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id 
        });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    })



    it("Should not be able to add a new specification to a non-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await expect(createCarSpecificationUseCase.execute({
            car_id, 
            specifications_id 
        })
        ).rejects.toEqual(new AppError("Car doesn't exists!"))
    })
})