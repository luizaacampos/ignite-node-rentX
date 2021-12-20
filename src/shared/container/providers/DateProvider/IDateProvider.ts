interface IDateProvider {
    compareHours(start_date: Date, end_date: Date): Number;
    convertoToUTC(date: Date): string;
    dateNow(): Date;
    compareDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };