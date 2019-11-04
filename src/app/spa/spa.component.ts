import { Component, OnInit,ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';
//ÞESSI COMPONENT ÆTTI AÐ HEITA CAFE EIGUM EFTIR AÐ BREYTA
@Component({
  selector: 'app-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css']
})
export class SpaComponent implements OnInit {
  //listinn fyrir kaffihúsin
  list: any[];
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
private toolservise: ToolServiceService
) { }
//hook sem nær í observerable frá tools  
ngOnInit() {
  let items = this.toolservise.getJson();
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.cafes;
    })
    //google maps API
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}

}
