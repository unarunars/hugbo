import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
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
  
  constructor(
    private toolService: ToolServiceService,
  ) { }
//ekki notað lengur, kanski seinna?
  ngOnChanges(changes: SimpleChanges){
    if( changes.chosen ){
      console.log(this.chosen);
    }
  }
  ngOnInit() {
    
  }
  

}
