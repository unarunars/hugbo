import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit {
  list: any[];
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
  private toolservise: ToolServiceService
) { }

ngOnInit() {
  let items = this.toolservise.getJson();
    items.subscribe( t=>{
      this.list = t.cafes;
      console.log(t);
    })
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}

}
