import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe("Create car", () => {

    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository();
        createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "test name", 
            description: "test", 
            daily_rate: 500, 
            license_plate: "MHT-5845" ,
            fine_amount: 100, 
            brand: "test brand", 
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existent license plate", async () => {
        await createCarUseCase.execute({
            name: "test name", 
            description: "test", 
            daily_rate: 500, 
            license_plate: "MHT-5845" ,
            fine_amount: 100, 
            brand: "test brand", 
            category_id: "category",
        });

        await expect(createCarUseCase.execute({
                name: "test name 2", 
                description: "test", 
                daily_rate: 500, 
                license_plate: "MHT-5845" ,
                fine_amount: 100, 
                brand: "test brand", 
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    })

    it("should not be able to create a car 'available = true' as default", async() => {
        const car = await createCarUseCase.execute({
            name: "Available", 
            description: "test", 
            daily_rate: 500, 
            license_plate: "ABC-5845" ,
            fine_amount: 100, 
            brand: "test brand", 
            category_id: "category",
        });

        expect(car.available).toBe(true);
    })

})