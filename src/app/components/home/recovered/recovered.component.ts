import { Component, OnInit, Input } from '@angular/core';
import { SortService } from '../../../services/sort/sort.service';
import { ApiKliciService } from '../../../services/APIklici/api-klici.service';
import { TransformToCountriesService } from '../../../services/countries/transform-to-countries.service';
import { Country } from '../../../classes/Country';
import { Tracker } from '../../../classes/Tracker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.scss']
})
export class RecoveredComponent implements OnInit {

  private allCases: Tracker;
  @Input() casesByCountry: Country[] = [];

  public openChild: boolean = false;
  public country: Country;

  private nameSort: string = "DESC";
  private numberSort: string = "ASC";

  constructor(
    private transformToCountries: TransformToCountriesService,
    private apiCalls: ApiKliciService,
    private sort: SortService,
    private modalService: NgbModal
  ) { }

  public sortByName(): void {
    if(this.nameSort === "ASC") {
      this.nameSort = "DESC";
      this.casesByCountry = this.sort.sortByCountryNameDESC(this.casesByCountry);
    } else {
      this.nameSort = "ASC";
      this.casesByCountry = this.sort.sortByCountryNameASC(this.casesByCountry);
    }
    this.numberSort = "ASC";
  }

  public sortByNumber() {
    if(this.numberSort === "ASC") {
      this.numberSort = "DESC";
      this.casesByCountry = this.sort.sortBySumOfRecoversDESC(this.casesByCountry);
    } else {
      this.numberSort = "ASC";
      this.casesByCountry = this.sort.sortBySumOfRecoversASC(this.casesByCountry);
    }

    this.nameSort = "DESC";
  }

  public clickAndOpen(country: Country): void {
    this.country = country;
    this.openChild = true;
  }

  public onModalClose(x: any):void {
    this.openChild = x;
  }

  ngOnInit(): void {
  }

}