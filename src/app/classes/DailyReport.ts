import { Confirmed } from './Confirmed';
import { Deaths } from './Deaths';
import { Recovered } from './Recovered';

export class DailyReports {
    reportDate: string;
    confirmed: Confirmed;
    deaths: Deaths;
    recovered: Recovered;
}