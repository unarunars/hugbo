import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
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
    return this.http.get('https://aust-hugbo1.herokuapp.com/locations');
    }
    postCommentJson(any: any[]){
      console.log(any);
      //þetta er það sem er á hold...
      this.http.post('https://api.myjson.com/bins/731fi', any);
      let activities = this.getJson();
      activities.subscribe( t => {
        console.log(t);
    })
    }
    //virkar ekki enþá siggi lagar á mrg
    isLogedIn():Observable<any>{
      return this.http.get('https://aust-hugbo1.herokuapp.com/authenticate', { withCredentials: true });  
    }
    //ekki komið H58DwRYHvH
    getLogOut():Observable<any>{
      return this.http.get('https://aust-hugbo1.herokuapp.com/logout', { withCredentials: true })
    }
    getLogedIn(user:any):Observable<any>{
      
      return this.http.post('https://aust-hugbo1.herokuapp.com/login', user, { withCredentials: true });
    }
    setRegister(user: any):Observable<any>{
     /* const params = new HttpParams()
        .set('username', username)
        .set('email', email)
        .set('password', password);*/
        console.log(user);
        return this.http.post('https://aust-hugbo1.herokuapp.com/register', user,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        } );
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
  setComment(comment: any):Observable<any>{
    return this.http.post('https://aust-hugbo1.herokuapp.com/comment', comment,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        } );
  }
}
