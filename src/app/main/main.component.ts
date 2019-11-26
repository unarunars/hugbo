import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; 
import { createHostListener } from '@angular/compiler/src/core';
import { ToolServiceService } from '../tool-service.service'
// rauninni bara til að hafa snyrtilegra, 
//svo er if lykkja í html-inu til að vita hvaða component á að koma
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  
  @Input() chosen: string;
  username: string;
  isLogedIn: boolean;
  @Output() user  = new EventEmitter<any>()
  //@Input(): isLogedIn: boolean; 


  
  
  constructor(
    private toolService: ToolServiceService,
  ) { }
//ekki notað lengur, kanski seinna?
  ngOnChanges(changes: SimpleChanges){
    if( changes.username ){
      console.log(this.username);
     // this.user.emit(this.username);

    }
  }
  ngOnInit(
    
  ) {
    console.log(this.username);
  }
  logedUser(e){
    console.log("afhvejru ekki hingað?");
    console.log(e);
     let observerable = this.toolService.isLogedIn();
    observerable.subscribe(t =>{
      console.log(t);
      console.log("héérr!");
      if(t === undefined){
        console.log("ekki loggaður inn");
        this.user.emit(t);
        this.username = t.username;
        this.isLogedIn = false;

      }else{
        this.isLogedIn = true;
        console.log("loggaður inn");
        this.user.emit(t);
      }
    })
  }
  

}
