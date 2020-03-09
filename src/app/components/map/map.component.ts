import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../classes/Country';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  @Input() casesByCountries: Country[];

  type="GeoChart";
  columnNames = [
    [{type: 'string', role: 'data'}],
    [{type: 'number', role: 'data'}]
  ]
  data = [     
  ];
  options = {
    colorAxis: {colors: [
      '#edf822',
      '#edf82a',
      '#edf82b',
      '#f8e422', 
      '#f6e117',
      '#f6cb17',
      '#eec417',
      '#eea417',
      '#f69e17',
      '#e79313',
      '#f67c17', 
      '#e75413', 
      '#e71314',
      '#e71315',
      '#e71316',
      '#e71317',
      '#e71318',
      '#e71319',
      '#e7131a',
      '#e7131b',
      '#eB1212',
      '#eB1213',
      '#eB1214',
      '#eB1215',
      '#eB1216',
      '#eB1217',
      '#eB1218',
      '#eB1219',
      '#b01515',
      '#980d0d',
      '#7a0b0b',
      '#6d0a0a',
      '#6d0a0b',
      '#6d0a0c',
      '#6d0a0d',
      '#6d0a0e',
      '#6d0a0f',
      '#6d0a10',
      '#6d0a11',
      '#6d0a12',
      '#6d0a13',
      '#6d0a14',
      '#6d0a15',
      '#6d0a16',
      '#6d0a17',
      '#6d0a18',
      '#6d0a19',
      '#6d0a1a',
      '#6d0a1b',
      '#6d0a1c',
      '#6d0a1d',
      '#6d0a1e',
      '#6d0a1f'
    ]},
  };

  private dataToChart(): void {
    this.casesByCountries.forEach(element => {
      let temp = [];

      if(element.countryName === "Mainland China")
        temp.push("China");
      else
        temp.push(element.countryName);
    

      temp.push(element.sumOfConfirms);
      this.data.push(temp);
    });
  }


  ngOnInit(): void {
    console.log("Ok");
    this.dataToChart();
  }
}
