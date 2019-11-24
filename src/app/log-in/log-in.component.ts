import { Component, OnInit } from '@angular/core';
import { ToolServiceService } from '../tool-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username: string = "";
  psw: string = "";
  isNotValidUsename: boolean = false;
  isNotValidPsw: boolean =false;
  list: any;
  constructor(
    private toolservise: ToolServiceService,
  ) { }

  ngOnInit() {

  }
  onKeyUsername(event: any){
    this.username =event.target.value;
    console.log(this.username);
  }
  onKeyPsw(event: any){
    this.psw = event.target.value;
    console.log(this.psw);
  }
  submit(){
    this.isNotValidPsw = false;
    this.isNotValidUsename =false;
    if(this.psw === "" ){
        this.isNotValidPsw = true;
          console.log("haa");
        
    }if(this.username === "" ){
      this.isNotValidUsename = true;
    }
    if(!this.isNotValidPsw && !this.isNotValidUsename){
      console.log("jee bara posta");
      console.log(this.username, this.psw);
      let user = {
        'username': this.username,
        'password': this.psw
      }
      let observerable = this.toolservise.getLogedIn(user);
      console.log(observerable)
      observerable.subscribe(t =>{
        //this.list = t;
        console.log("wtf");
        console.log(t);
      })
      console.log(observerable);
    }
    console.log(this.list);
  }

}
