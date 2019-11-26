import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExportService } from '../../api/export.service';
import { DatabaseConnectService } from '../../api/database-connect.service';
import { Data } from '@angular/router';
import { ToolServiceService } from '../tool-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() user  = new EventEmitter<boolean>()
  Resturants: String = this.exportService.stringReykjavik();
  constructor(
    private exportService: ExportService,
    private databaseConnect: DatabaseConnectService,
    private toolService: ToolServiceService,

  ){ }

  ngOnInit() {
    let observerable = this.toolService.isLogedIn();
    observerable.subscribe(t =>{
      console.log(t);
      console.log("héérr!");
      if(t === undefined){
        console.log("ekki loggaður inn");
        this.user.emit(false);
        console.log(this.user);
      }else{
        console.log("loggaður inn");
        this.user.emit(true);
        console.log(this.user);
      }
    })
  }
  
}
