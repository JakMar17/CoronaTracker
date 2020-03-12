import { Component, OnInit } from '@angular/core';

import { ApiKliciService } from '../../services/APIklici/api-klici.service';
import { TransformToCountriesService } from '../../services/countries/transform-to-countries.service';
import { Country } from '../../classes/Country';
import { SortService } from '../../services/sort/sort.service';
import { World } from '../../classes/World';
import { WorldService } from '../../services/world/world.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private allCases: any;
  public casesByCountries: Country[] = [];
  public world: World = new World();

  public spinner: boolean = true;

  constructor(
    private apiCalls: ApiKliciService,
    private countryService: TransformToCountriesService,
    private worldService: WorldService
  ) {
  }

  public sortByCountries(): void {
    this.apiCalls.getAll().then(
      (data) => {

        this.countryService.sortAll(data, this.casesByCountries);
        this.countryService.calculatePercents(this.casesByCountries);

        this.apiCalls.getAllCountriesInfo().then(
          (data) => {
            this.countryService.setCountryPopulation(this.casesByCountries, data);
            this.worldService.calculateWorldPopulation(data,this.world);

            this.apiCalls.getWorldLatest().then(
              (data) => {
    
                this.worldService.getWorldData(this.world, data);
                
                this.spinner = false;
    
              });
          });
      }
    );
  }

  ngOnInit(): void {
    this.sortByCountries();
    
  }

}
