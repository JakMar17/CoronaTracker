import { Component, OnInit } from '@angular/core';

import { Country } from '../../classes/Country';
import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { SortService } from '../../services/sort/sort.service';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  constructor(
    private apiCalls: ApiKliciService,
    private sort: SortService,
    private countryService: TransformToCountriesService
  ) { }

  public spinner: boolean = false;
  public tracker: any[];
  public casesByCountries: Country[] = [];
  private per100000: Country[];

  private getCasesByCountry(): void {
    this.apiCalls.getAll().then(
      (data) => {
        this.tracker = data;

        this.countryService.sortAll(this.tracker, this.casesByCountries);

        this.apiCalls.getAllCountriesInfo().then(
          (data) => {
            this.countryService.setCountryPopulation(this.casesByCountries, data);

            this.calculatePer100000();
            this.setColumnConfirmChartData();
            this.setRecoveredChartData();
            this.setDeathsChartData();
          });


      }
    );
  }

  ngOnInit(): void {
    this.getCasesByCountry();
  }

  private calculatePer100000(): void {
    this.per100000 = [];
    
    
  }

  private copyArray(original: any[], copy: any[]): void { 
    original.forEach(e => copy.push(Object.assign({}, e)));
  }

  public confirmColumnNamesChart: any[] = ['Country', 'Confirmed in 100 000'];
  public columnChart = "ColumnChart";
  public confirmDataChart = [];
  public columnChartOptions = {
    legend: "top",
    chartArea: {'width': '90%', 'height': '70%'},
    colors:["#12B783"]
  }

  private setColumnConfirmChartData(): void {

    let data: Country[] = [];
    
    this.casesByCountries.forEach(element => {
      if(element.population >= 100000) {
        element.sumOfConfirms = 
          element.sumOfConfirms / element.population * 100000;
        data.push(element);
      }
    });

    this.sort.sortBySumOfConfirmedDESC(data);

    for(let i = 0; i < 10; i++) {
      let element: Country = data[i];
      this.confirmDataChart.push([element.countryName, element.sumOfConfirms]);
    }
  }

  public recoveredColumnNames: any[] = ['Country', 'Recovered in 100 000'];
  public recoveredDataChart: any[] = [];
  private setRecoveredChartData(): void {
    
    let data: Country[] = [];
    
    this.casesByCountries.forEach(element => {
      if(element.population >= 100000) {
        element.sumOfRecovers = 
          element.sumOfRecovers / element.population * 100000;
        data.push(element);
      }
    });

    this.sort.sortBySumOfRecoversDESC(data);
    
    for(let i = 0; i < 10; i++) {
      let element: Country = data[i];
      this.recoveredDataChart.push([
        element.countryName,
        element.sumOfRecovers
      ]);
    }
  }

  public deathsColumnNames: any[] = ['Country', 'Deaths per 100 000'];
  public deathsDataChart: any[] = [];
  private setDeathsChartData(): void {
    
    let data: Country[] = [];
    
    this.casesByCountries.forEach(element => {
      if(element.population >= 100000) {
        element.sumOfDeaths =
          element.sumOfDeaths / element.population * 100000;
        data.push(element);
      }
    });

    this.sort.sortBySumOfDeathsDESC(data);
    for(let i = 0; i < 10; i++) {
      let element: Country = data[i];
      this.deathsDataChart.push([
        element.sumOfDeaths,
        element.countryName,
      ]);
    }
  }

}
