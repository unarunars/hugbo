import { Component, Output,ViewChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToolServiceService } from './tool-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reykjavik-gui';
  isLogedIn: boolean; 
  isData: boolean = false;
  private data:any = []
  
  @Output() chosen: string = "home";
  @Output() username: string = "";
  ngOnInit(){
    console.log("halló");
    let observerable = this.toolService.isLogedIn();
    observerable.subscribe(t =>{
      console.log(t.username);
      console.log("héérr!");
      if(t.username !== undefined) {
        this.isLogedIn = true;
        this.username = t.username;

        console.log("skráðu inn");
      }else{
        this.isLogedIn = false;
        console.log("ekki skráður inn")
        this.username = "";

      }
    })
    this.isData = true;
  }
  constructor(private http: HttpClient,
  private toolService: ToolServiceService,
  ) {  
  }
/*
  getData(){
    const url ='https://jsonplaceholder.typicode.com/photos?albumId=1'
    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }*/
  
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
  goLogin(){
    console.log("login");
    this.chosen = "login";
  }
  goSignup(){
    console.log("signup");
    this.chosen = "signup";
  }
  logOut(){
    let temp = this.toolService.getLogOut();
    temp.subscribe( t => {
      console.log(t);
      let observerable = this.toolService.isLogedIn();
    observerable.subscribe(t =>{
      console.log(t.username);
      console.log("héérr!");
      this.username = t.username;
      if(t.username !== undefined) {
        this.isLogedIn = true;
        console.log("ekki loggaður inn");
      }else{
        this.isLogedIn = false;
      }
    })
    })
    
  }

}
