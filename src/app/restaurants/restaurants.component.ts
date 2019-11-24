import { Component, OnInit, ViewChild, Input, ɵɵcontainerRefreshEnd } from '@angular/core';
import {  } from 'googlemaps'; 
import { ToolServiceService } from '../tool-service.service';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  //fyrir google maps api
  @ViewChild('map', {static: true}) mapElement: any;
    map: google.maps.Map;
  //global fylki fyrir veitingastaðina
  //til að ýtra í gegnum það í htmlinu
  list: any[];
  barsComment: any[];
  title: string = "";
  comment: string = "";
  id: number;
  constructor(
    private toolservise: ToolServiceService,
  ) { }
  toogle(e){
    console.log(e);
    if(!e){
      this.refresh();
    }else{
      let filtItems = this.toolservise.getJson();
      let temp = [];
      
      filtItems.subscribe(t=>{
        t.restaurant.map( item =>{
          console.log(item)
          if(item.type === e){
            console.log(e, t.restaurant, item);
            temp.push(item);
            console.log(temp);
          }
        })
        this.list = temp;
      })
    }
  }
    refresh(){
      let items = this.toolservise.getJson();
    //subscripa það svo í listann
    items.subscribe( t=>{
      this.list = t.restaurant;
    })
    }
//hook sem nær í observerable frá tools    
  ngOnInit() {
    this.refresh();
    //ná í úr google maps API
    const mapProperties = {
      center: new google.maps.LatLng(64.1436456, -21.9270884),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

  clickedBar(item){
    this.list.map(t =>{
      //console.log(t);
      if(t.name === item.name){
        if(!t.isClicked){
          t.isClicked = true;
          this.id = t.id
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
