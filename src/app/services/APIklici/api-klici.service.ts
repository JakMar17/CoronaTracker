import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Tracker } from '../../classes/Tracker';
import { Confirmed } from '../../classes/Confirmed';

@Injectable({
  providedIn: 'root'
})
export class ApiKliciService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "https://covid19.mathdro.id/api";

  public getAll(): Promise<any[]> {
    let url: string = this.baseURL + "/confirmed";
    
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

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
