interface IDateProvider {
    compareHours(start_date: Date, end_date: Date): Number;
    convertoToUTC(date: Date): string;
    dateNow(): Date;
    compareDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };