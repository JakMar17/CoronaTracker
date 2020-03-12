import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { Country } from '../../classes/Country';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { World } from '../../classes/World';
import { WorldService } from '../../services/world/world.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  public tracker: any[] = [];
  public worldLatest: World = new World();
  public casesByCountries: Country[] = [];

  public openChild: boolean = false;
  public country: Country;
  public searchText: string = "";

  public spinner: boolean = true;


  constructor(
    private apiCalls: ApiKliciService,
    private countryService: TransformToCountriesService,
    private worldService: WorldService,
    private modalService: NgbModal
  ) { }

  public sortByCountries(): void {
    this.apiCalls.getAll().then(
      (data) => {
        this.tracker = data;

        this.countryService.sortAll(this.tracker, this.casesByCountries);
        this.countryService.calculatePercents(this.casesByCountries);

        this.apiCalls.getAllCountriesInfo().then(
          (data) => {
            this.countryService.setCountryPopulation(this.casesByCountries, data);
            this.worldService.calculateWorldPopulation(data,this.worldLatest);

            this.apiCalls.getWorldLatest().then(
              (data) => {
    
                this.worldService.getWorldData(this.worldLatest, data);
                
                this.spinner = false;
    
                this.setPieChartTypes();
                this.setChartClosedCases();
    
              });

          });


      }
    );
  }

  public clickAndOpen(country: Country): void {
    this.country = country;
    this.openChild = true;
  }

  public onModalClose(x: any):void {
    this.openChild = x;
  }

  ngOnInit(): void {
    this.sortByCountries();
  }


  // chart graph data
  public columnNamesPieChart: string[] = ['Type', 'Number'];
  public optionPieChart = {
    legend: "none",
    pieSliceText: "label",
    colors: ["#680114", "#86DB41", "#ECA72C"],
    chartArea: {'width': '100%', 'height': '100%'},
  }
  
  // % of in progress cases
  public pieChartInProgress: any[] = [];
  private setPieChartTypes(): void {
    this.pieChartInProgress.push(['Deaths', this.worldLatest.deaths]);
    this.pieChartInProgress.push(['Recovered', this.worldLatest.recovered]);
    let x = this.worldLatest.confirmed - this.worldLatest.deaths - this.worldLatest.recovered;
    this.pieChartInProgress.push(['Active', x]);
  }

  // % of sick people
  public pieChartClosedCases: any[] = [];
  private setChartClosedCases(): void {
    this.pieChartClosedCases.push(['Deaths', this.worldLatest.deaths]);
    this.pieChartClosedCases.push(['Recovered', this.worldLatest.recovered]);
  }

}
