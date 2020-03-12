import { Injectable } from '@angular/core';
import { ApiKliciService } from '../APIklici/api-klici.service';
import { World } from '../../classes/World';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(
    private apiCalls: ApiKliciService
  ) { }

  public getWorldData(world: World, data: any) {
    world.confirmed = data.confirmed.value;
    world.deaths = data.deaths.value;
    world.pOfDeaths = world.deaths / world.confirmed * 100;
    world.recovered = data.recovered.value;
    world.pOfRecovers = world.recovered / world.confirmed *100;
    world.pActive = 100 - world.pOfDeaths - world.pOfRecovers;
  }

  public calculateWorldPopulation(data: any, world: World) {
    let sum: number = 0;
    
    data.forEach(element => {
      sum += element.population;
    });

    world.population = sum;
  }
}
