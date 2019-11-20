import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.css']
})
export class SaloonComponent implements OnInit {
  @ViewChild('map', {static: true}) mapElement: any;
  list: any[];
  map: google.maps.Map;

constructor(
  private toolservise: ToolServiceService,
) { }
toogle(e){
  console.log(e);
  if(!e){
    this.refresh();
  }else{
    let filtItems = this.toolservise.getJson();
    let temp = [];
    
    filtItems.subscribe(t=>{
      t.hairsaloons.map( item =>{
        if(item.type === e){
          console.log(e, t.saloon, item);
          temp.push(item);
          console.log(temp);
        }
      })
      this.list = temp;
    })
  }
}
refresh(){
  let items = this.toolservise.getJson();
    //subscripa í listann
    items.subscribe( t=>{
      this.list = t.hairsaloons;
    })
}
//hook sem nær í observerable frá tools  
  ngOnInit() {
    this.refresh();
    //ná í úr google maps API
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}
clickedBar(item){
  this.list.map(t =>{
    //console.log(t);
    if(t.name === item.name){
      if(!t.isClicked){
        t.isClicked = true;
      console.log(t);
      }else {
        t.isClicked = false;
      }
      
    }
    
  })
  
}
}
