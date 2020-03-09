import { Confirmed } from "./Confirmed";
import { Deaths } from "./Deaths";
import { Recovered } from "./Recovered";

export class Tracker {
    confirmed: Confirmed;
    deaths: Deaths;
    recovered: Recovered;
}