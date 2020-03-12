import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

   @Input() data: any;
   @Input() columnNames: any;
   @Input() options: any;
   @Input() type: string;
   @Input() title: string;
  
   width = "100%"

  ngOnInit(): void {
    console.log(this.data)
  }

}
