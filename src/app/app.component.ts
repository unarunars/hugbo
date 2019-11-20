import { Component, Output,ViewChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'reykjavik-gui';
  private data:any = []
  
  @Output() chosen: string = "home";

  constructor(private http: HttpClient) {  
  }

  getData(){
    const url ='https://jsonplaceholder.typicode.com/photos?albumId=1'
    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }
  
  // click event segir hvaða takka var ýtt á
  //sendir svo chosen strenginn í hina componentana úr htmlinu
  goHome(){
    this.chosen = "home";
  }
  goRestaurant(){
    this.chosen = "restaurant";
  }
  goBars(){
    this.chosen = "bars";
  }
  goSaloon(){
    this.chosen = "saloon";
  }
  goCafe(){
    this.chosen = "cafe";
  }
  goSwimming(){
    this.chosen = "swimming";
  }

}
