import { Critical } from './Critical';
import { Deceased } from './Deceased';
import { InHospital } from './InHospital';
import { InICU } from './InICU';
import { OutOfHospital } from './OutOfHospital';

export class PatientsDistribution {
    outOfHospital: OutOfHospital;
    inHospital: InHospital;
    icu: InICU;
    critical: Critical;
    deceased: Deceased;
}