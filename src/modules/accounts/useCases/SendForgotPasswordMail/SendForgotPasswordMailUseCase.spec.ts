import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let fakeUsersRepository: FakeUsersRepository;
let dateProvider: DayjsDateProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;

describe("Send forgot mail", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        dateProvider = new DayjsDateProvider();
        fakeUsersTokensRepository = new FakeUsersTokensRepository();
        fakeMailProvider = new FakeMailProvider();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            fakeUsersRepository,
            fakeUsersTokensRepository,
            dateProvider,
            fakeMailProvider
        );
    })

    it("Should be able to send a forgot password mails to a user", async () => {
        const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

        await fakeUsersRepository.create({
            name: "teste da silva",
            driverslicense: '123458',
            email: "test@test.com",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail if user does not exist", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("testando@testamdo.com")
        ).rejects.toEqual(new AppError("User doesn't exist!"))
    });

    it("Should be able to create a user token", async () => {
        const generateToken = jest.spyOn(fakeUsersTokensRepository, "create");

        await fakeUsersRepository.create({
            name: "teste",
            driverslicense: '1238878',
            email: "teste@teste.com",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("teste@teste.com");

        expect(generateToken).toHaveBeenCalled();
    })
});