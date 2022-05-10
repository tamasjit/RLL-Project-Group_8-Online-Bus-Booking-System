import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})
export class NewHomeComponent implements OnInit {
  control = new FormControl();

  minDate = new Date();



  source: String;
  destination: String;
  dateOfJourney: Date;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem("userId"));
    var myIndex = 0;
    carousel();
    function carousel() {
      var i;
      var x;
      x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) { myIndex = 1 }
      try {
        x[myIndex - 1].style.display = "block";
      }
      catch {

      }
      finally {
        setTimeout(carousel, 2000); // Change image every 2 seconds
      }
    }


  }



  checkBus(searchBusForm: NgForm) {
    if (this.source === this.destination) {
     document.getElementById("errorForDirectClick").innerHTML="Source and Destination cannot be same or Empty";
    }
    else if (searchBusForm.valid) {
      document.getElementById("errorForDirectClick").innerHTML="";
      sessionStorage.setItem("source", this.source.toString());
      sessionStorage.setItem("destination", this.destination.toString());
      sessionStorage.setItem("dateOfJourney", this.dateOfJourney.toString());
      this.router.navigate(['searchBus']);
    }
    else {
      document.getElementById("errorForDirectClick").innerHTML="Enter valid infomation";
    }

  }


}


