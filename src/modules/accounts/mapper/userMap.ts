import { instanceToInstance } from 'class-transformer';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
    static toDTO({
        email,
        id,
        name,
        avatar,
        driverslicense,
        avatar_url
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            id,
            name,
            avatar,
            driverslicense,
            avatar_url
        })
        return user;
    }
}

export { UserMap }