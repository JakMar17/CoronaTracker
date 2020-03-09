import { Province } from "./Province";

export class Country {
    countryName: string;
    provinces: Province[] = [];
    sumOfConfirms: number = 0;
    pInProgress: any;
    sumOfRecovers: number = 0;
    pOfRecovers: any;
    sumOfDeaths: number = 0;
    pOfDeaths: any;
}