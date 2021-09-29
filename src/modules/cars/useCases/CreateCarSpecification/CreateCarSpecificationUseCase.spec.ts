import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe("Create Car Specification", () => {
    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(fakeCarsRepository);
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

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id });
    })

    it("Should not be able to add a new specification to a non-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            
            await createCarSpecificationUseCase.execute({car_id, specifications_id });
        }).rejects.toBeInstanceOf("appError")
    })
})