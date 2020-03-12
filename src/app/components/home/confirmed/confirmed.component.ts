import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from '../home.component';
import { Country } from '../../../classes/Country';
import { TransformToCountriesService } from '../../../services/countries/transform-to-countries.service';
import { ApiKliciService } from '../../../services/APIklici/api-klici.service';
import { SortService } from '../../../services/sort/sort.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  
  @Input() casesByCountry: Country[] = [];

  private nameSort: string = "DESC";
  private numberSort: string = "ASC";
  
  public openChild: boolean = false;
  public country: Country;

  public searchText: string = "";

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
      this.casesByCountry = this.sort.sortBySumOfConfirmedDESC(this.casesByCountry);
    } else {
      this.numberSort = "ASC";
      this.casesByCountry = this.sort.sortBySumOfConfirmedASC(this.casesByCountry);
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
