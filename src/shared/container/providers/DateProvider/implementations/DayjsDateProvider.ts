import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    
    dateNow(): Date {
        return dayjs().toDate();
    }

    convertoToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareHours(start_date: Date, end_date: Date): Number {
        const end_date_utc = this.convertoToUTC(end_date);
        const start_date_utc = this.convertoToUTC(start_date);
        
        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    compareDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertoToUTC(end_date);
        const start_date_utc = this.convertoToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
    }

}

export { DayjsDateProvider };