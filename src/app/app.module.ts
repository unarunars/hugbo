import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SwimmingPoolComponent } from './swimming-pool/swimming-pool.component';
import { HomeComponent } from './home/home.component';
import { SaloonComponent } from './saloon/saloon.component';
import { SpaComponent } from './spa/spa.component';
import { BarsComponent } from './bars/bars.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RestaurantsComponent,
    SwimmingPoolComponent,
    HomeComponent,
    SaloonComponent,
    SpaComponent,
    BarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
