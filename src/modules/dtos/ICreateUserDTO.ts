interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driverslicense: string;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO }