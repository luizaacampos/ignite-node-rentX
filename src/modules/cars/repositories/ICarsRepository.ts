import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository }