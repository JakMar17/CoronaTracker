import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Tracker } from '../../classes/Tracker';
import { Confirmed } from '../../classes/Confirmed';

@Injectable({
  providedIn: 'root'
})
export class ApiKliciService {

  constructor(private http: HttpClient) { }

  private baseURL:string = "https://coronavirus-tracker-api.herokuapp.com/";

  /*public getMoneyExchangeRates(): Promise<ExchangeRate> {
    let url: string = this.baseURL + "rates/money";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as ExchangeRate)
      .catch(this.obdelajNapako);
  }*/

  public getAll(): Promise<Tracker> {
    let url: string = this.baseURL + "all";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as Tracker
      )
      .catch(this.obdelajNapako)
  }

  public getConfirmed(): Promise<Confirmed> {
    let url: string = this.baseURL + "confirmed";

    return this.http
      .get(url)
      .toPromise()
      .then(
        data => data as Confirmed[]
      )
      .catch(this.obdelajNapako)
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
