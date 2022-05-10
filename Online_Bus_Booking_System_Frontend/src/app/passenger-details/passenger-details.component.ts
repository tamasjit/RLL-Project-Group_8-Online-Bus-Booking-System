
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from '../passenger';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  emailOfPassenger: string;
  allPassengerList: Passenger[] = [];
  fetchedSeatInfo;

  passengerDetail: Passenger = new Passenger();
  numberOfPassengers: number;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.fetchedSeatInfo = JSON.parse(sessionStorage.getItem("seatsOfPassengers"));
    this.numberOfPassengers = this.fetchedSeatInfo.length;
    for (let i = 0; i < this.numberOfPassengers; i++) {
      console.log(this.fetchedSeatInfo[i]);
    }
  }

  addPassenger() {
    if (this.passengerDetail.passengerName == null || this.passengerDetail.passengerAge == null || this.passengerDetail.gender == null) {
      document.getElementById("msgpassenger").innerHTML = "Please fill all the information.";
    } else {
      document.getElementById("msgpassenger").innerHTML = "";
      var pass: Passenger = {
        passengerId: null,
        passengerName: this.passengerDetail.passengerName,
        passengerAge: this.passengerDetail.passengerAge,
        gender: this.passengerDetail.gender,
        seatNo: this.fetchedSeatInfo[this.numberOfPassengers - 1]
      }

      this.allPassengerList.push(pass);


      for (let i = 0; i < this.allPassengerList.length; i++) {
        console.log(this.allPassengerList[i]);
      }
      this.numberOfPassengers--;
    }
  }
  proceedToPay(contactForm: NgForm) {
    if (contactForm.valid && this.numberOfPassengers <= 0) {
      sessionStorage.setItem("emailOfPassenger", this.emailOfPassenger);
      sessionStorage.setItem("listOfPassenger", JSON.stringify(this.allPassengerList));
      this.router.navigate(['paymentLink']);
    }
    else {
      alert("Please enter correct information.");
    }
  }
}

