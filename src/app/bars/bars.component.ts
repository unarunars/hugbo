import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  barsComment: any[];
  title: string = "";
  comment: string = "";
  isDataReady: boolean = false;

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
      this.list = t.bars;
      t.bars.map(item =>{
        this.barsComment = item.comments;
      })
      console.log(t);
      this.isDataReady = true;
    })
    //taka frá google maps API
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
