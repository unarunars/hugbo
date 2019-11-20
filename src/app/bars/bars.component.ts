import { Component, OnInit, ViewChild,ElementRef, NgZone, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit {
  //globalbreyta fyrir listann af kaffihúsum til
  //að geta ítrað í gegnum hann í html-inu
  list: any[];
  barsComment: any[];
  title: string = "";
  comment: string = "";
  isDataReady: boolean = false;
  lat: number = 64.147209;
  lng: number = -21.942400  ;
  zoom: number;
  address: string;
  private geoCoder;
  
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;
  //til að tengja google maps
  
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
  //smiður fyrir tool service 
  private toolservise: ToolServiceService,
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone
) { }

//hook sem nær í observerable frá tools
ngOnInit() {
  let items = this.toolservise.getJson();

  //subscripar það svo í listann
    items.subscribe( t=>{
      this.list = t.bars;
      t.bars.map(item =>{
        this.barsComment = item.comments;
      })
      console.log(t);
      this.isDataReady = true;
    })
    //taka frá google maps API þetta er það ef þú villt prufa hitt... 
    /*
  const mapProperties = {
    center: new google.maps.LatLng(64.1436456, -21.9270884),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);*/
    this.setCurrentLocation();
    //þetta allt tekið frá maps API skoða betur
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      console.log(autocomplete);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult =  autocomplete.getPlace();
          console.log(place);
          console.log(autocomplete.get)
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = //place.geometry.location.lat();
          this.lng =  //place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  /*
    */
}
// Get Current Location Coordinates
private setCurrentLocation() {
  console.log(this.searchElementRef);
  if ('geolocation' in navigator) {
    console.log(navigator);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.heading);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.lat, this.lng);
    });
  }
}


markerDragEnd($event: MouseEvent) {
  console.log($event);
  this.lat = $event.coords.lat;
  this.lng = $event.coords.lng;
  this.getAddress(this.lat, this.lng);
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}


clickedBar(item){
  this.list.map(t =>{
    //console.log(t);
    if(t.name === item.name){
      if(!t.isClicked){
        t.isClicked = true;
       // this.lat = 64.122272;
       // this.lng = -21.871059;
      console.log(t);
      }else {
        t.isClicked = false;
      } 
    }
  })
  
}
onKeyTitle(event: any){
  console.log(event.target.value);
  this.title = event.target.value;
}
onKeyComment(event: any){
  this.comment = event.target.value;
  console.log(this.comment);
}
submitComment(){
  let obj = {'title': this.title, 'comment': this.comment};
  this.barsComment.push(obj);
  console.log(obj);
  console.log(this.barsComment);
  this.toolservise.postCommentJson(this.barsComment);
}

}
