import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; 
import { createHostListener } from '@angular/compiler/src/core';
import { ToolServiceService } from '../tool-service.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  
  @Input() chosen: string;
  restaurant: any[];
  swimmingPool: any[];
  cafe: any[];
  gotData: boolean = false;
  constructor(
    private toolService: ToolServiceService,
  ) { }

  ngOnChanges(changes: SimpleChanges){
    if( changes.chosen ){
      console.log(this.chosen);
    }
  }
  ngOnInit() {
    //this.refresh();
    console.log(this.restaurant);
    //this.gotData = true;

  }
  refresh(){
    console.log()
  }

}
