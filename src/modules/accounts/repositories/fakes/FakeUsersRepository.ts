import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
    users: User[] = [];

    async create({ driverslicense, email, name, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driverslicense, 
            email, 
            name, 
            password
        })

        this.users.push(user);

    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

}

export { FakeUsersRepository };