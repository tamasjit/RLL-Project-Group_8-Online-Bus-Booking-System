import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-cancel-reschedule-ticket',
  templateUrl: './cancel-reschedule-ticket.component.html',
  styleUrls: ['./cancel-reschedule-ticket.component.css']
})
export class CancelRescheduleTicketComponent implements OnInit {

  constructor(private service:UserService) { }


  isLoggedIn:boolean;
  cancelTicketId:number;
  
  ngOnInit(): void {
    this.cancelTicketId=Number(sessionStorage.getItem("cancelTicketId"));
    if( sessionStorage.getItem("userId") !== null){
       this.isLoggedIn=true;
    }else{
      this.isLoggedIn=false;
    }
  }

  cancelFunction(){
    this.service.cancelTicket(this.cancelTicketId).subscribe(
      result=>{
        console.log(result);
        document.getElementById("resultDiv").innerHTML="Your ticket has been cancelled";
      }
    );

  }

}
