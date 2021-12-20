import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokensRepository = new FakeUsersTokensRepository();
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            fakeUsersRepository,
            fakeUsersTokensRepository,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    })

    it("should be able to authenticate user", async () => {
        const user: ICreateUserDTO = {
            driverslicense: "58745",
            email: "test123@gmail.com",
            password: "123456",
            name: "user Test"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an non existent user", async () => {
        await expect(authenticateUserUseCase.execute({
                email: "testFake@gmail.com",
                password: "123456",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    })

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driverslicense: "547895",
            email: "test123@test.com",
            password: "123456",
            name: "Error User"
        }
        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "12345"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
})