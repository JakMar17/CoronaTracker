import { StatsPerRegionSlo } from './StatsPerRegionSlo';
import { StatsPerAgeGroupSlo } from './StatsPerAgeGroupSlo';
import { OldTests } from './OldTests';

export class StatsSlo {
    dayFromStart: number;
    year: number;
    month: number;
    day: number;
    phase: string;
    performedTestsToDate: number;
    performedTests: number;
    positiveTestsToDate: number;
    positiveTests: number;
    statePerAgeToDate: StatsPerAgeGroupSlo[];
    statePerRegion: StatsPerRegionSlo;
    testsAt14: OldTests;
}