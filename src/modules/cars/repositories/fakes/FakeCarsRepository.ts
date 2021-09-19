import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class FakeCarsRepository implements ICarsRepository {
    cars: Car[] = [];

   async create({ 
        brand,
        category_id,
        dayli_rate,
        description,
        fine_amount,
        name,
        license_plate
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            brand,
        category_id,
        dayli_rate,
        description,
        fine_amount,
        name,
        license_plate
        })

        this.cars.push(car)
    }
}

export { FakeCarsRepository };