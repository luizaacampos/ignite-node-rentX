interface ICreateCarDTO {
    name: string;
    description: string;
    dayli_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

export { ICreateCarDTO };