import { Component, OnInit, ViewChild,ElementRef, NgZone, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { templateJitUrl } from '@angular/compiler';

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
  lng: number = -21.942400;
  zoom: number;
  address: string;
  id: number;
  isLogedIn: boolean;
  username: string;
  private geoCoder;
  @Input() value;
  //isLogedin: boolean;
  
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
toogle(e){
  let temp = [];
  console.log(e);
  if(!e){
    this.refresh();
  }else{
    let filtItems = this.toolservise.getJson();
    filtItems.subscribe(t=>{
      this.list = t.bars;
      t.bars.map(item => {
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

  //subscripar það svo í listann
    items.subscribe( t=>{
      this.list = t.bars;
      this.getComments(t);
      /*t.bars.map(item =>{
        this.barsComment = item.comments;
      })*/
      console.log(t);
      this.LogedIn();

      this.isDataReady = true;
    })
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
getComments(t){
  t.bars.map(item =>{
        this.barsComment = item.comments;
      })
}
//hook sem nær í observerable frá tools
ngOnInit() {
  this.refresh();

    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      //this.geoCoder = new google.maps.Geocoder;

    });
  console.log(this.isLogedIn);
  console.log(this.username);
}
// Get Current Location Coordinates
private setCurrentLocation() {
  console.log(this.searchElementRef);
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
        this.id = t.id
        this.lat = t.lat;
        this.lng = t.lon;
        this.zoom = 17;
       // this.lat = 64.122272;
       // this.lng = -21.871059;
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
