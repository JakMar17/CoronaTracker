import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GoogleChartsModule } from 'angular-google-charts';

import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';
import { SearchPipePipe } from './pipes/search-pipe/search-pipe.pipe';
import { ConfirmedComponent } from './components/home/confirmed/confirmed.component';
import { DeathsComponent } from './components/home/deaths/deaths.component';
import { RecoveredComponent } from './components/home/recovered/recovered.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { WorldComponent } from './components/world/world.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MapComponent } from './components/map/map.component';
import { ChartComponent } from './components/chart/chart.component';
import { AboutComponent } from './components/about/about.component';
import { VisualizationComponent } from './components/visualization/visualization.component';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeSl, 'sl-SL');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmedComponent,
    DeathsComponent,
    RecoveredComponent,
    CountryModalComponent,
    SpinnerComponent,
    WorldComponent,
    SearchPipePipe,
    PieChartComponent,
    MapComponent,
    ChartComponent,
    AboutComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule.forRoot('AIzaSyCGmkFP4iiLmzYu2tnB2K9gf_qGE3F8KYk')
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
