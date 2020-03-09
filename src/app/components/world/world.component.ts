import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { Tracker } from '../../classes/Tracker';
import { Country } from '../../classes/Country';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  public tracker: Tracker
  public casesByCountries: Country[] = [];

  public openChild: boolean = false;
  public country: Country;
  public searchText: string = "";

  public spinner: boolean = true;

  @ViewChild("searchBox") xxx: ElementRef;

  constructor(
    private apiCalls: ApiKliciService,
    private countryService: TransformToCountriesService,
    private modalService: NgbModal
  ) { }

  public sortByCountries(): void {
    this.apiCalls.getAll().then(
      (data) => {
        this.tracker = data;
        this.countryService.sortConfirmed(this.tracker, this.casesByCountries);
        this.countryService.sortDeaths(this.tracker, this.casesByCountries);
        this.countryService.sortRecovered(this.tracker, this.casesByCountries);

        this.countryService.calculatePercents(this.casesByCountries);
        this.spinner = false;
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

  public setFocus(): void {

    console.log("ok");
    this.xxx.nativeElement.focus();
  }

  ngOnInit(): void {
    this.sortByCountries();
  }

}
