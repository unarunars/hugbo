import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; 
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  
  @Input() chosen: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if( changes.chosen ){
      console.log(this.chosen);
    }
  }
  ngOnInit() {
    console.log(this.chosen);
  }

}
