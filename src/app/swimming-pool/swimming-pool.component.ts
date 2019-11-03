import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-swimming-pool',
  templateUrl: './swimming-pool.component.html',
  styleUrls: ['./swimming-pool.component.css']
})
export class SwimmingPoolComponent implements OnInit {
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
