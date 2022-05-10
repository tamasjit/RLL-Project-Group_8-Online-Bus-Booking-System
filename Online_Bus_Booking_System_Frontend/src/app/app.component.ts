import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Bus-Reservation';


 

 isStatus:Boolean=true;
 status:boolean;
userId:number;
 
  constructor(private service:UserService, private router:Router) { 
   // this.isStatus=Boolean(sessionStorage.getItem("status"));

   this.isStatus=Boolean(sessionStorage.getItem("status"));
   this.userId=Number(sessionStorage.getItem("userId"));


   
  }
  ngOnInit(): void {
  

   
  }

  signOut(){
    console.log(this.userId);
    sessionStorage.clear();


    // sessionStorage.removeItem("userId");
    // sessionStorage.setItem("status",false.valueOf.toString())

    this.isStatus=false;
    console.log(this.userId);
    this.router.navigate(['homeLink'])

  }
 


}
