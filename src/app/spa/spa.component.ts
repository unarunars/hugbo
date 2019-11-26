import { Component, OnInit,ViewChild , NgZone} from '@angular/core';
import { ToolServiceService } from '../tool-service.service';
import { MapsAPILoader } from '@agm/core';

//ÞESSI COMPONENT ÆTTI AÐ HEITA CAFE EIGUM EFTIR AÐ BREYTA
@Component({
  selector: 'app-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css']
})
export class SpaComponent implements OnInit {
  //listinn fyrir kaffihúsin
  list: any[];
  barsComment: any[];
  title: string = "";
  comment: string = "";
  id: number;
  lat: number = 64.147209;
  lng: number = -21.942400;
  zoom: number;

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
      this.list = t.bars;
      t.cafes.map(item => {
        console.log(item.type, e)
        for(let i = 0; i < item.type.length; i++){
          if(item.type[i] === e){
            temp.push(item);
          }
        }
      })
      this.list = temp;
    })
  }
}
refresh(){
  let items = this.toolservise.getJson();
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.cafes;
    })
}
//hook sem nær í observerable frá tools  
ngOnInit() {
  this.refresh();
    //google maps API
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

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
