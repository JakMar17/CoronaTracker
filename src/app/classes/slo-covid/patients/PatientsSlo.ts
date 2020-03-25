import { PatientsDistribution } from './PatientsDistribution';

export class PatientsSlo {
    year: number;
    month: number;
    day: number;
    dayFromStart: number;
    total: PatientsDistribution;
}