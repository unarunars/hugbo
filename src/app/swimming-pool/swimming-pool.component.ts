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
//hook sem nær í observerable frá tools  
ngOnInit() {
  let items = this.toolservise.getJson();
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.swimming;
      console.log(t);
    })
    // google maps API...
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
}

}
