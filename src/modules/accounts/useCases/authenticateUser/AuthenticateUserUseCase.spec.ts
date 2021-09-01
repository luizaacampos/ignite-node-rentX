import { AuthenticateUserUsecase } from "./AuthenticateUserUsecase"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUsecase";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUsecase;
let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUsecase(fakeUsersRepository);
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

    it("should not be able to authenticate an non existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "testFake@gmail.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driverslicense: "547895",
                email: "test123@test.com",
                password: "123456",
                name: "Error User"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "12345"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})