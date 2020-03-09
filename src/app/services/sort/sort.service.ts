import { Injectable } from '@angular/core';
import { Country } from '../../classes/Country';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public sortByCountryNameASC(casesByCountries: Country[]): Country[] {
    casesByCountries.sort( (a, b) => {
      if (a.countryName <= b.countryName)
        return -1;
      else
        return 1;
    });

    return casesByCountries;
  }

  public sortByCountryNameDESC(casesByCountries: Country[]): Country[] {
    casesByCountries.sort( (a, b) => {
      if (a.countryName > b.countryName)
        return -1;
      else
        return 1;
    });

    return casesByCountries;
  }

  public sortBySumOfConfirmedASC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return a.sumOfConfirms - b.sumOfConfirms;
    });

    return casesByCountry;
  }

  public sortBySumOfConfirmedDESC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return b.sumOfConfirms - a.sumOfConfirms;
    });

    return casesByCountry;
  }

  public sortBySumOfDeathsASC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return a.sumOfDeaths - b.sumOfDeaths;
    });

    return casesByCountry;
  }

  public sortBySumOfDeathsDESC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return b.sumOfDeaths - a.sumOfDeaths;
    });

    return casesByCountry;
  }

  public sortBySumOfRecoversASC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return a.sumOfRecovers - b.sumOfRecovers;
    });

    return casesByCountry;
  }

  public sortBySumOfRecoversDESC(casesByCountry: Country[]): Country[] {
    casesByCountry.sort( (a, b) => {
      return b.sumOfRecovers - a.sumOfRecovers;
    });

    return casesByCountry;
  }
}
