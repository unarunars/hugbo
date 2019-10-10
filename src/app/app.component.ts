import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reykjavik-gui';
  
  @Output() chosen: string = "";

  refresh(){

  }
  constructor(){
    
  }
  openSideNav(){
    console.log("hehe");
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
  goSpa(){
    this.chosen = "spa";
  }
  goSwimming(){
    this.chosen = "swimming";
  }

}
