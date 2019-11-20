import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-swimming-pool',
  templateUrl: './swimming-pool.component.html',
  styleUrls: ['./swimming-pool.component.css']
})
export class SwimmingPoolComponent implements OnInit {
  //listinn fyrir sundlaugar
  list: any[];
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
  private toolservise: ToolServiceService
) { }
toogle(e){
  console.log(e);
  if(!e){
    this.refresh();
  }else{
    let filtItems = this.toolservise.getJson();
    let temp = [];
    
    filtItems.subscribe(t=>{
      t.swim.map( item =>{
        console.log(item.type);
        //ÞARF AÐ LAGA ÞETTA
        for(let i = 0; i< item.type.length; i++){
          if(item.type[i] === e && temp === []){
            temp.push(item);

          }else if(item.type[i] === e && temp !== item.type[i]){ 
            temp.push(item);
          }
        }
        console.log(temp);
        
      })
      this.list = temp;
    })
  }
}
refresh(){
  let items = this.toolservise.getJson();
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.swim;
      console.log(t);
    })
}
//hook sem nær í observerable frá tools  
ngOnInit() {
  this.refresh();
    // google maps API...
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
