import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
  selector: 'app-swimming-pool',
  templateUrl: './swimming-pool.component.html',
  styleUrls: ['./swimming-pool.component.css']
})
export class SwimmingPoolComponent implements OnInit {
  //listinn fyrir sundlaugar
  list: any[];
  barsComment: any[];
  title: string = "";
  comment: string = "";
  id: number;
  lat: number = 64.147209;
  lng: number = -21.942400;
  zoom: number;
  isLogedIn: boolean;
  username: string;
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
  private toolservise: ToolServiceService,
  
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone
) { }
toogle(e){
  let temp = [];
  console.log(e);
  if(!e){
    this.refresh();
  }else{
    let filtItems = this.toolservise.getJson();
    filtItems.subscribe(t=>{
      this.list = t.swim;
      t.swim.map(item => {
        console.log(item.type, e)
        for(let i = 0; i < item.type.length; i++){
          if(item.type[i] === e){
            temp.push(item);
          }
        }
      })
      this.list = temp;
      console.log(this.list);
    })
  }
}
LogedIn() {
  console.log("fer í LogedIn fallið");
  let observerable = this.toolservise.isLogedIn();
    observerable.subscribe(t =>{
      console.log(t.username);
      console.log("héérr!");
      if(t.username !== undefined) {
        this.username = t.username;
        console.log(t.username);
        console.log("skráðu inn");
        this.isLogedIn = true;
      }else{
        console.log("ekki skráður inn")
        this.isLogedIn = false;

      }
    });
}
refresh(){
  let items = this.toolservise.getJson();
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.swim;
      console.log(t);
      this.LogedIn();
    })
}
//hook sem nær í observerable frá tools  
ngOnInit() {
  this.refresh();
    // google maps API...
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      //this.geoCoder = new google.maps.Geocoder;
      });

}
// Get Current Location Coordinates
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    console.log(navigator);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.heading);
      this.lng = -21.942400;
      this.lat = 64.147209;
      this.zoom = 12;
    });
  }
}
clickedBar(item){
  this.list.map(t =>{
    //console.log(t);
    if(t.name === item.name){
      if(!t.isClicked){
        t.isClicked = true;
        this.id = t.id;
        this.lat = t.lat;
        this.lng = t.lon;
        this.zoom = 17;
      console.log(t);
      }else {
        t.isClicked = false;
        this.lng = -21.942400;
        this.lat = 64.147209;
        this.zoom = 12;
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
submitComment(id){
  let obj = {'title': this.title, 'comment': this.comment,'locations_id' : this.id};
  //this.barsComment.push(obj);
  //console.log(obj);
  //console.log(this.barsComment);
  let ob = this.toolservise.setComment(obj);
  ob.subscribe(t =>{
    console.log(t);
    if(t.length === 0){
      console.log("þetta er skráð");
      console.log(id);
      this.list.map( item=>{
        if(item.id = id){
          console.log()
          this.refresh();
        }
      })
    }
  })
}
}
