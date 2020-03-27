import { Component, OnInit } from '@angular/core';

import { PatientsSlo } from '../../classes/slo-covid/patients/PatientsSlo';
import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { StatsSlo } from '../../classes/slo-covid/StatsSlo';

@Component({
  selector: 'app-slovenia',
  templateUrl: './slovenia.component.html',
  styleUrls: ['./slovenia.component.css']
})
export class SloveniaComponent implements OnInit {

  constructor(
    private apiCalls: ApiKliciService
  ) { }

  public showChart: boolean = false;

  public patientsSLO: PatientsSlo[];
  public statsSlo: StatsSlo[];

  private getPatientDistribution(): void {
    this.apiCalls.getPatientsSlovenia().then(
      (data) => {
        this.patientsSLO = data;
        this.setHospitalChartData();
      }
    )
  }

  private getStatsSlovenia(): void {
    this.apiCalls.getStatsSlovenia().then(
      (data) => {
        this.statsSlo = data;
        this.setStatsChartData();
      }
    )
  }

  ngOnInit(): void {
    this.getPatientDistribution();
    this.getStatsSlovenia();
  }

  public lineChartOptions = {
    legend: "none",
    chartArea: {'width': '90%', 'height': '70%'}
  };

  public hospitalColumnNames: string[] = ["Datum", "Hospitalizirani", "Intenzivna nega", "Kritično stanje"];
  public hospitalChartData: any[] = [];
  private setHospitalChartData(): void {
    this.patientsSLO.forEach(element => {

      let temp : any[] = [
        (element.day + "." + element.month),
        element.total.inHospital.today == null ? 0 : element.total.inHospital.today,
        element.total.icu.today == null ? 0 : element.total.icu.today,
        element.total.critical.today == null ? 0 : element.total.critical.today
      ];

      this.hospitalChartData.push(temp);

    });
  }

  public testsChartOptions = {
    chartArea: {'width': '85%', 'height': '85%'},
    seriesType: 'bars',
    legend: 'none',
    series: {1: {type: 'line'}}
  }
  public testsColumnNames: string[] = ["Datum", "Testiranja skupaj", "Testiranja dnevno"];
  public testsChartData: any[] = [];

  public positiveTestsColumnNames: string[] = ["Datum", "Pozitivnih skupaj", "Pozitivnih dnevno"];
  public positiveTestsChartData: any[] = [];

  public ageGroupsChartColumnNames: string[] = ["Starostna skupina", "Vsi primeri", "Moški", "Ženske"];
  public ageGroupsChartData: any[] = [];
  public ageGroupsChartOptions = {
    chartArea: {'width': '85%', 'height': '85%'},
    legend: 'bottom'
  }

  public regionsChartColumnNames: string[] = ["Regija", "Število primerov"];
  public regionsChartOptions = {
    chartArea: {'width': '95%', 'height': '95%'},
    legend: 'none'
  };
  public regionsChartData: any [] = [];

  private setStatsChartData(): void {

    let last: StatsSlo;

    this.statsSlo.forEach(element => {
      let tempTests: any[] = [
        (element.day + "." + element.month),
        element.performedTestsToDate,
        element.performedTests
      ];

      let tempPositives: any[] = [
        (element.day + "." + element.month),
        element.positiveTestsToDate,
        element.positiveTests
      ];

      this.testsChartData.push(tempTests);
      this.positiveTestsChartData.push(tempPositives);

      last = element;
    });

    last.statePerAgeToDate.forEach(element => {
      if (element.allToDate) {
        
        let tempAge: any[] = [
          (element.ageFrom + (element.ageTo != null ? ' - ' + element.ageTo : '+')),
          element.allToDate,
          element.femaleToDate,
          element.maleToDate
        ]

        this.ageGroupsChartData.push(tempAge);
        
      }
    });

    this.regionsChartData.push(
      ["Celje", last.statePerRegion.ce],
      ["Tuji državljani", last.statePerRegion.foreign],
      ["Krško", last.statePerRegion.kk],
      ["Koper", last.statePerRegion.kp],
      ["Ljubljana", last.statePerRegion.lj],
      ["Maribor", last.statePerRegion.mb],
      ["Murska Sobota", last.statePerRegion.ms],
      ["Nova Gorica", last.statePerRegion.ng],
      ["Postojna", last.statePerRegion.po],
      ["Slovenj Gradec", last.statePerRegion.sg],
      ["Nedoločeno", last.statePerRegion.unknown],
      ["Zagorje", last.statePerRegion.za]
    );

    this.showChart = true;
  }

}
