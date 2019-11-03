import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {  } from 'googlemaps'; 
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  @ViewChild('map', {static: true}) mapElement: any;
    map: google.maps.Map;
  @Input() restaurant;
  constructor() { }

  ngOnInit() {
    
    console.log(this.restaurant);
    const mapProperties = {
      center: new google.maps.LatLng(64.1436456, -21.9270884),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

}
