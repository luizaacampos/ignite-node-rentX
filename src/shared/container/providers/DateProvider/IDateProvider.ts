interface IDateProvider {
    compareHours(start_date: Date, end_date: Date): Number;
    convertoToUTC(date: Date): string;
    DateNow(): Date;
}

export { IDateProvider };