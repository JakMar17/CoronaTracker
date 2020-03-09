import { Component, OnInit, Input, ElementRef, ViewChild, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../classes/Country';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.css']
})
export class CountryModalComponent implements OnInit {

  @Input() country: Country;
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
    console.log(this.closeValue)
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
  }
  
  ngAfterViewInit(){
    console.log(this.content);
    this.open(this.content);
  }

}
