import { Component, OnInit } from '@angular/core';
import { ExportService } from '../../api/export.service';
import { DatabaseConnectService } from '../../api/database-connect.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Resturants: String = this.exportService.stringReykjavik();
  constructor(
    private exportService: ExportService,
    private databaseConnect: DatabaseConnectService
  ){ }

  ngOnInit() {

  }
  
}
