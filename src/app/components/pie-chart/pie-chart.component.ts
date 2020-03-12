import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() data: any;
  @Input() columnNames: any;
  @Input() options: any;
  type = "PieChart"

  ngOnInit(): void {
  }

}
