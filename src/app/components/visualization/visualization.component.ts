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

  private getCasesByCountry(): void {
    this.apiCalls.getAll().then(
      (data) => {
        this.tracker = data;

        this.countryService.sortAll(this.tracker, this.casesByCountries);
        console.log(this.casesByCountries);

        this.apiCalls.getAllCountriesInfo().then(
          (data) => {
            console.log(data);
            this.countryService.setCountryPopulation(this.casesByCountries, data);

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

  public confirmColumnNamesChart: any[] = ['Country', 'Confirmed in 100 000'];
  public columnChart = "ColumnChart";
  public confirmDataChart = [];
  public columnChartOptions = {
    legend: "none",
    chartArea: {'width': '90%', 'height': '70%'},
    colors:["#12B783"]
  }

  private setColumnConfirmChartData(): void {
    let per100000: Country[] = [];
    
    this.casesByCountries.forEach(element => {
      if(element.population >= 100000) {
        element.sumOfConfirms = 
          element.sumOfConfirms / element.population * 100000;
        per100000.push(element);
      }
    });

    this.sort.sortBySumOfConfirmedDESC(per100000);

    for(let i = 0; i < 10; i++) {
      let element: Country = per100000[i];
      this.confirmDataChart.push([element.countryName, element.sumOfConfirms]);
    }
  }

  public recoveredColumnNames: any[] = ['Country', 'Recovered in 100 000'];
  public recoveredDataChart: any[] = [];
  private setRecoveredChartData(): void {
    let per100000: Country[] = [];

    this.casesByCountries.forEach(element => {
      if(element.population >= 100000) {
        element.sumOfRecovers = 
          element.sumOfRecovers / element.population * 100000;
        per100000.push(element);
      }
    });

    this.sort.sortBySumOfRecoversDESC(per100000);
    
    for(let i = 0; i < 10; i++) {
      let element: Country = per100000[i];
      this.recoveredDataChart.push([
        element.countryName,
        element.sumOfRecovers
      ]);
    }
  }

  public deathsColumnNames: any[] = ['Country', 'Deaths per 100 000'];
  public deathsDataChart: any[] = [];
  private setDeathsChartData(): void {
    let per100000: Country[] = [];

    this.casesByCountries.forEach(element => {
      if (element.population >= 100000) {
        element.sumOfDeaths = 
          element.sumOfDeaths / element.population * 100000;
          per100000.push(element);
      }
    });

    this.sort.sortBySumOfDeathsDESC(per100000);
    for(let i = 0; i < 10; i++) {
      let element: Country = per100000[i];
      this.deathsDataChart.push([
        element.countryName,
        element.sumOfDeaths
      ]);
    }
  }

}
