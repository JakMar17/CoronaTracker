import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { WorldComponent } from "./components/world/world.component";
import { AppComponent } from "./app.component";


const routes: Routes = [
  {
    path: "countries",
    component: HomeComponent
  },
  { 
    path: "",
    component: WorldComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
