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
  barsComment: any[];
  title: string = "";
  comment: string = "";
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

constructor(
private toolservise: ToolServiceService
) { }
toogle(e){
  console.log(e);
  if(!e){
    this.refresh();
  }else{
    let filtItems = this.toolservise.getJson();
    let temp = [];
    
    filtItems.subscribe(t=>{
      t.cafes.map( item =>{
        if(item.type === e){
          console.log(e, t.saloon, item);
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
  //subscripa í listann
    items.subscribe( t=>{
      this.list = t.cafes;
    })
}
//hook sem nær í observerable frá tools  
ngOnInit() {
  this.refresh();
    //google maps API
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
