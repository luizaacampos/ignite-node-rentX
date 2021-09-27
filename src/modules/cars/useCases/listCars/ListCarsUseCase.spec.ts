import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe("list cars", () => {

    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository()
        listCarsUseCase = new ListCarsUseCase(fakeCarsRepository);
    })

    it("should be able to list all avaiable cars", async () => {

        const car = await fakeCarsRepository.create({
            name: "car 1",
            description: "thats car 1",
            daily_rate: 500, 
            license_plate: "JUI-4785",
            fine_amount: 100,
            brand: "brand X", 
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availabe cars by brand", async () => {
        const car = await fakeCarsRepository.create({
            name: "car 1",
            description: "thats car 1",
            daily_rate: 500, 
            license_plate: "JUI-4785",
            fine_amount: 100,
            brand: "brand Y", 
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "brand Y",
        });

        expect(cars).toEqual([car]);
    });
})