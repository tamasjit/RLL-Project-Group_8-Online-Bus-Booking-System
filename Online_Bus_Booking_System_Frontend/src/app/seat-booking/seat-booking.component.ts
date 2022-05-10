import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Bus } from '../Bus';
import { DatePipe } from '@angular/common';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  bookedSeats: string[] = [];
  selectedSeatCount: number = 0;
  isSeatSelected: boolean = true;
  selectedSeatsList: Set<string> = new Set();

  totalAmount: number = 0;
  dateValue: any;
  dateOfJourney;
  busId: number;
  selectedBus: Bus;

  constructor(private busService: BusService, public datepipe: DatePipe, private router: Router) { }


  ngOnInit(): void {
    this.busId = Number(sessionStorage.getItem("selectedBusId"));
    this.dateValue = (sessionStorage.getItem('dateOfJourney'));
    this.dateOfJourney = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    this.busService.fetchBookedSeats(this.dateOfJourney, this.busId).subscribe(
      fetchedSeatList => {
        this.bookedSeats = fetchedSeatList;
        sessionStorage.setItem("seatList", JSON.stringify(this.bookedSeats))
      }
    );

    this.bookedSeats = JSON.parse(sessionStorage.getItem("seatList"));
    const disabledSeats = this.bookedSeats.map((element) => {
      const bookedSeat1 = document.getElementById(element);
      bookedSeat1.classList.toggle("occupied");
      return bookedSeat1;
    });

    // this code is to get bus information by bus id
    this.busService.getBusById(this.busId).subscribe(
      fetchedBus => {
        this.selectedBus = fetchedBus
      });
  }

  selectSeat(seat: string) {
    const selectedSeat = document.getElementById(seat);
    if (selectedSeat.classList.contains("selected")) {
      selectedSeat.classList.remove("selected");
      this.selectedSeatCount--; 
    }
    else if (selectedSeat.classList.contains("occupied")) {  
    }
    else {
      selectedSeat.classList.toggle("selected");
      this.selectedSeatCount++;
    }

    if (selectedSeat.classList.contains("selected")) {
      this.selectedSeatsList.add(selectedSeat.id);

    }
    else if (selectedSeat.classList.contains("occupied")) {

    }
    else {
      this.selectedSeatsList.delete(selectedSeat.id);
    }



    this.totalAmount = this.selectedSeatsList.size * this.selectedBus.fare;

    console.log(this.totalAmount);

    //this code is to disable button until and unless the seat is selected
    if (this.selectedSeatCount != 0) {


        this.isSeatSelected = false;
         
         
      }else {
      this.isSeatSelected = true;
     }

  }

  //selectSeatsList have the seats selected by the user
  //bookedSeats hace the seats already booked in the bus
  //this function is to set passenger number and route to passenger page
  sendDataOfSeats() {
      const selectedSeatsArray = Array.from(this.selectedSeatsList);
      sessionStorage.setItem("seatsOfPassengers", JSON.stringify(selectedSeatsArray));
      sessionStorage.setItem("totalFare", this.totalAmount.toString());
      this.router.navigate(['passengerDetailsLink']);
  }

}
