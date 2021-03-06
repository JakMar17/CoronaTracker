import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiKliciService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "https://covid19.mathdro.id/api/";
  private baseURLCountries = "https://restcountries.eu/rest/v2/";
  private baseURLSLovenia = "https://covid19.rthand.com/api/";

  public getAll(): Promise<any[]> {
    let url: string = this.baseURL + "confirmed";
    
    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any[]
      )
      .catch(this.obdelajNapako);
  }

  public getWorldLatest(): Promise<any> {
    return this.http
      .get(this.baseURL)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.obdelajNapako);
  }

  public getAllCountriesInfo(): Promise<any> {
    let url: string = this.baseURLCountries + "all";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.obdelajNapako);
  }

  public getDailyData(): Promise<any> {
    let url: string = this.baseURL + "daily";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.obdelajNapako)
  }

  public getPatientsSlovenia(): Promise<any> {
    let url: string = this.baseURLSLovenia + "patients";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.obdelajNapako);
  }

  public getStatsSlovenia(): Promise<any> {
    let url: string = this.baseURLSLovenia + "stats";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as any
      )
      .catch(this.obdelajNapako);
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
