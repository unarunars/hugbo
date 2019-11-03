import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { readJSON } from '../api/DatabaseFetch.js';

@Injectable({
  providedIn: 'root'
})
//hérna á að vera endapunktarnir
export class ToolServiceService {
  restaurants: any;
  cafe: any;
  swimming: any;
  constructor(
    private http: HttpClient,
    //private readjson: readJSON
  ) { }
  getJson(): Observable<any>{
    console.log()
   /* this.http.get('https://api.myjson.com/bins/11wwo4').subscribe(t =>{
      console.log(t);
    })*/
    return this.http.get('https://api.myjson.com/bins/16tj8g');
    }
  getRestaurants(): any[]{
    let activities = this.getJson();
    activities.subscribe( t => {
      this.restaurants = t;
      console.log(t);
    })
    console.log(this.restaurants);

    return this.restaurants;
  }
  getCafe(){
    let activities = this.getJson();
    activities.subscribe( t => {
      this.cafe = t.cafe;
    })
  }
  getSwimming(){
    let activities = this.getJson();
    activities.subscribe( t => {
      this.swimming = t.swimming;
    })
  }
}
