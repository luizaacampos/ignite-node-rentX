import { FakeCarsRepository } from "@modules/cars/repositories/fakes/FakeCarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe("list cars", () => {

    beforeEach(() => {
        fakeCarsRepository = new FakeCarsRepository()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
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

        const cars = await listAvailableCarsUseCase.execute({});

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

        const cars = await listAvailableCarsUseCase.execute({
            brand: "brand Y",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availabe cars by name", async () => {
        const car = await fakeCarsRepository.create({
            name: "car 2",
            description: "thats car 1",
            daily_rate: 500, 
            license_plate: "JUI-4777",
            fine_amount: 100,
            brand: "brand Y", 
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "car 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availabe cars by category", async () => {
        const car = await fakeCarsRepository.create({
            name: "car 3",
            description: "thats car 3",
            daily_rate: 500, 
            license_plate: "JUI-4885",
            fine_amount: 100,
            brand: "brand Y", 
            category_id: "7858512",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "7858512",
        });

        expect(cars).toEqual([car]);
    });
})