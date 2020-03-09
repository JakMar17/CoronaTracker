import { Injectable } from '@angular/core';
import { ApiKliciService } from '../APIklici/api-klici.service';
import { Tracker } from '../../classes/Tracker';
import { Country } from '../../classes/Country';
import { Location } from '../../classes/Location';
import { Province } from '../../classes/Province';

@Injectable({
  providedIn: 'root'
})
export class TransformToCountriesService {

  constructor(
    private apiCalls: ApiKliciService
  ) { }

  public sortConfirmed(allCases: Tracker, casesByCountry: Country[]): void {
    allCases.confirmed.locations.forEach(element => {
          
      let country: Country;
    
      casesByCountry.forEach(e => {
        if(e.countryName == element.country)
          country = e;
      });

      if (country == null) {
        country = new Country();
        country.countryName = element.country;
        casesByCountry.push(country);
      }

      country.sumOfConfirms += element.latest;
      
      let province: Province = new Province();
      province.confirmed = element.latest;
      province.coordinates = element.coordinates;
      province.provinceName = element.province;

      country.provinces.push(province);
    });
  }

  public sortDeaths(allCases: Tracker, casesByCountry: Country[]): void {
    allCases.deaths.locations.forEach(element => {

      let country: Country;
      casesByCountry.forEach(e => {
        if (e.countryName == element.country)
          country = e;
      });

      if (country == null) {
        country = new Country();
        country.countryName = element.country;
        casesByCountry.push(country);
      }

      country.sumOfDeaths += element.latest;

      let province: Province;
      country.provinces.forEach(e => {
        if (e.provinceName == element.province)
          province = e;
      });

      if (province == null) {
        province = new Province();
        province.provinceName = element.province;
        province.coordinates = element.coordinates;
        country.provinces.push(province);
      }

      province.deaths = element.latest;
      
    });
  }

  public sortRecovered(allCases: Tracker, casesByCountry: Country[]): void {
    allCases.recovered.locations.forEach(element => {

      let country: Country;
      casesByCountry.forEach(e => {
        if (e.countryName == element.country)
          country = e;
      });

      if (country == null) {
        country = new Country();
        country.countryName = element.country;
        casesByCountry.push(country);
      }

      country.sumOfRecovers += element.latest;

      let province: Province;
      country.provinces.forEach(e => {
        if (e.provinceName == element.province)
          province = e;
      });

      if (province == null) {
        province = new Province();
        province.provinceName = element.province;
        province.coordinates = element.coordinates;
        country.provinces.push(province);
      }

      province.recovered = element.latest;
      
    });
  }

  public calculatePercents(casesByCountry: Country[]): void {
    casesByCountry.forEach(element => {
      element.pOfDeaths = ((element.sumOfDeaths / element.sumOfConfirms) * 100).toFixed(2);
      //element.pOfDeaths += "%";
      element.pOfRecovers = ((element.sumOfRecovers / element.sumOfConfirms) * 100).toFixed(2);
      element.pInProgress = (100 - ((element.sumOfDeaths / element.sumOfConfirms) * 100) - ((element.sumOfRecovers / element.sumOfConfirms) * 100)).toFixed(2);
    })
  }

}
