import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit {
  //globalbreyta fyrir listann af kaffihúsum til
  //að geta ítrað í gegnum hann í html-inu
  list: any[];
  //til að tengja google maps
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
  //smiður fyrir tool service 
  private toolservise: ToolServiceService
) { }
//hook sem nær í observerable frá tools
ngOnInit() {
  let items = this.toolservise.getJson();
  //subscripar það svo í listann
    items.subscribe( t=>{
      this.list = t.cafes;
      console.log(t);
    })
    //taka frá google maps API
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}

}
