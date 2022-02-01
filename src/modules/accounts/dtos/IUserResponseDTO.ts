interface IUserResponseDTO {
    email: string;
    id: string;
    name: string;
    avatar: string;
    driverslicense: string;
    avatar_url():  string;
}

export { IUserResponseDTO }