import { Component, OnInit, Input, ElementRef, ViewChild, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../classes/Country';
import { EventEmitter } from '@angular/core';
import { World } from '../../classes/World';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.css']
})
export class CountryModalComponent implements OnInit {

  @Input() country: Country;
  @Input() world: World;
  @Output() closeValue = new EventEmitter<any>();
  @ViewChild('content') private content;

  closeResult: string;

  constructor(
    private modalService: NgbModal
  ) { }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  public closeModal(): void {
    this.closeValue.emit(false);
    this.modalService.dismissAll();
  }

  public pOfRecovers(country: Country): string {
    return country.pOfRecovers + "%";
  }

  public pOfDeaths(country: Country): string {
    return country.pOfDeaths + "%";
  }

  public pInProgress(country: Country): string {
    return country.pInProgress + "%";
  }

  ngOnInit(){

    let worldInProgress = this.world.confirmed - this.world.deaths - this.world.recovered;
    let countryInProgress = this.country.sumOfConfirms - this.country.sumOfDeaths - this.country.sumOfRecovers;

    this.columnNames = ["Type", "World", this.country.countryName];

    this.dataForChart = [
      [
        "In progress", 
        worldInProgress / (this.world.population / 100000), 
        countryInProgress / (this.country.population / 100000)
      ],
      [
        "Recovered",
        this.world.recovered / (this.world.population / 100000),
        this.country.sumOfRecovers / (this.country.population / 100000)
      ],
      [
        "Deaths",
        this.world.deaths / (this.world.population / 100000),
        this.country.sumOfDeaths / (this.country.population / 100000)
      ]
    ];

    this.options = {
      vAxis:{
        minValue:0
     },
     hAxis: {
       title: this.country.countryName + " vs. world per 100 000"
     },
    };
  }
  
  ngAfterViewInit(){
    this.open(this.content);
  }

  public chartType: string = "ColumnChart";
  public dataForChart: any[] = [];
  public columnNames: any = [];
  public options = {
   
  };

}
