import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe("Create car", () => {

    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository();
        createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
    })

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "test name", 
            description: "test", 
            dayli_rate: 500, 
            license_plate: "MHT-5845" ,
            fine_amount: 100, 
            brand: "test brand", 
            category_id: "category",
        });
    })
})