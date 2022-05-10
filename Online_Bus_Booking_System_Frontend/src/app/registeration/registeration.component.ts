import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../User';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})


export class RegisterationComponent implements OnInit {
  control = new FormControl();

  minDate = new Date();

  user: User = new User();
  userCPassword: string;
  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit() {

  }

  checkPassword() {
    if (this.user.password != this.userCPassword) {
      document.getElementById("resultDiv").innerHTML = "Confirm Password Is Not Matching";
    }
    else {
      document.getElementById("resultDiv").innerHTML = "";
    }
  }


  checkRegister(registerationForm: NgForm) {
    if (registerationForm.valid) {
      var modal = document.getElementById("myModal1");
      modal.style.display = "block";

      // Get the button that opens the modal
      var btn1 = document.getElementById("btn1");
      btn1.onclick = function () {
        modal.style.display = "block";
      }
      this.userservice.registerUser(this.user).subscribe(

        userPersisted => {
          if (userPersisted.userId != 0) {
            this.userservice.sendMailOnRegistration(userPersisted.userId).subscribe(
              fetchedBoolean => {
                console.log("Mail Sent" + fetchedBoolean);
              }
            );

          }
          console.log(userPersisted);
          const ticketId = Number(sessionStorage.getItem("ticketId"));
          if (ticketId != 0) {
            this.userservice.addTicketToUser(ticketId, userPersisted.userId).subscribe(
              fetchedTicket => {
                console.log(fetchedTicket);
              }
            );
          }
        }
      );
    }
    else {
      document.getElementById("btn2").innerHTML = "Please fill the requried details";
    }
  }

}





