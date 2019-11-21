import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
    }
  }

}
