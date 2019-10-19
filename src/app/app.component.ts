import { Component, Output,ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'reykjavik-gui';
  
  
  @Output() chosen: string = "home";

  constructor(){
  }
  
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
