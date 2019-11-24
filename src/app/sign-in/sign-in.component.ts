import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToolServiceService } from '../tool-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = "";
  psw: string = "";
  psw1: string = "";
  mail: string = "";
  isNotValidUsename: boolean = false;
  isNotValidPsw: boolean =false;
  isNotValidMail: boolean = false;
  isRegisterd: boolean = false;

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
  onKeyPsw2(event: any){
    this.psw1 = event.target.value;
    console.log(this.psw1);
  }
  onKeyMail(event: any){
    this.mail = event.target.value;
    console.log(this.mail);
  }
  submit(){
    console.log("jee");
    console.log(this.psw);
    console.log(this.psw);
    this.isNotValidMail = false;
    this.isNotValidPsw = false;
    this.isNotValidUsename =false;
    
    if(this.psw !== this.psw1 || this.psw === "" ){
        this.isNotValidPsw = true;
          console.log("haa");
        
    }if(this.username === "" ){
      this.isNotValidUsename = true;
    }if(this.mail === ""){
      this.isNotValidMail = true;
    }if(!this.isNotValidMail && !this.isNotValidPsw && !this.isNotValidUsename){
      console.log("allt rétt bara posta jeehe");
      let user = {
        'username': this.username,
        'email':this.mail,
        'password': this.psw};
      let i = this.toolservise.setRegister(user);
      console.log(i);
      i.subscribe(t => {
        console.log(t);
        this.isRegisterd = t;
      })
    }
    

  }
    
  
}


