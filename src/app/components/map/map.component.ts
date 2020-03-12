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
      '#F0FF82',
      '#E7FF33',
      '#FFEC33',
      '#FFD433',
      '#FFA721',
      '#FF7821',
      '#FF2121',
      '#CA0707',
      '#A90505'
    ]},
    legend: "none"
  };

  private dataToChart(): void {
    this.casesByCountries.forEach(element => {
      let temp = [];

      switch(element.countryName) {
        case "Mainland China":
          temp.push("China");
          break;
        case "Russian Federation":
          temp.push("Russia");
          break;
        case "UK":
          temp.push("United Kingdom");
          break;
        case "Republic of Korea":
          temp.push("South Korea");
          break;
        case "Iran (Islamic Republic of)":
          temp.push("Iran");
          break;
        default:
          temp.push(element.countryName);
      }
    
      let v: number = 1024 * Math.log(element.sumOfConfirms) / 5;

      let tempNumber = {f: element.sumOfConfirms, v: v};

      temp.push(tempNumber);
      this.data.push(temp);
    });
  }


  ngOnInit(): void {
    console.log("Ok");
    this.dataToChart();
  }
}
