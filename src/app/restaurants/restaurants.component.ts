import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  } from 'googlemaps'; 
import { ToolServiceService } from '../tool-service.service';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  //fyrir google maps api
  @ViewChild('map', {static: true}) mapElement: any;
    map: google.maps.Map;
  //global fylki fyrir veitingastaðina
  //til að ýtra í gegnum það í htmlinu
  list: any[];
  constructor(
    private toolservise: ToolServiceService,
  ) { }
//hook sem nær í observerable frá tools    
  ngOnInit() {
    let items = this.toolservise.getJson();
    //subscripa það svo í listann
    items.subscribe( t=>{
      this.list = t.restaurant;
    })
    //ná í úr google maps API
    const mapProperties = {
      center: new google.maps.LatLng(64.1436456, -21.9270884),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

}
