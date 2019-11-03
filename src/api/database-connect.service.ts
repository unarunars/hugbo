import { Injectable } from '@angular/core';
//import { Client } from 'pg';


@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  /*client = new Client({
    user: '',
    host: 'localhost',
    password: '12345678',
    database: 'lmao',
    port: '3456'
  });*/

  constructor() { }
  /*
  async clientConnect(){
    await this.client.connect();
  }*/
}
