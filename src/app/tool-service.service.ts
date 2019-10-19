import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { readJSON } from 

@Injectable({
  providedIn: 'root'
})
//hérna á að vera endapunktarnir
export class ToolServiceService {

  constructor(
    private http: HttpClient
  ) { }
  getJson(){

    }
}
