import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { Country } from '../../classes/Country';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { World } from '../../classes/World';

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
    private modalService: NgbModal
  ) { }

  public sortByCountries(): void {
    this.apiCalls.getAll().then(
      (data) => {
        this.tracker = data;

        this.countryService.sortAll(this.tracker, this.casesByCountries);
        this.countryService.calculatePercents(this.casesByCountries);

        this.apiCalls.getWorldLatest().then(
          (data) => {

            this.worldLatest.confirmed = data.confirmed.value;
            this.worldLatest.deaths = data.deaths.value;
            this.worldLatest.recovered = data.recovered.value;
            
            this.spinner = false;
          }
        );

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

}
