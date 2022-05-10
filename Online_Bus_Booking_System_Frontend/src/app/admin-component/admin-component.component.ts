import { Component, OnInit } from '@angular/core';
import { NgForm, RadioControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Bus } from '../Bus';
import { AdminService } from '../service/admin.service';
import { BusService } from '../service/bus.service';
import { Status } from '../status.enum';
import { Ticket } from '../Ticket';
import { User } from '../User';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {

  status: Status = Status.BOOKED;
  isBookinghidden: boolean = true;
  isAddBushidden: boolean = true;
  ispreferredbushidden: boolean = true;
  isupDateRoutehidden: boolean = true;
  iscusthidden: boolean = true;
  isNoBooking: boolean = true;
  loggedInAdminId: number;
  isStatus: boolean = true;


  bookingDetails: Ticket[];
  busDetails: Bus[];
  updatedbusDetails: Bus[];
  userDetails: User[];

  addBus: Bus = new Bus();
  updateBus: Bus = new Bus();
  bookBus: Bus = new Bus();


  bus: Bus = new Bus();
  ticket: Ticket = new Ticket();
  user: User = new User();
  busadded: Bus = new Bus();
  updateddBus: Bus = new Bus();
  fetchedBus: Bus = new Bus();
  uBus: Bus = new Bus();
  userList: User[];
  userLists: User[];
  mostbus: Number[];
  mostPreferredBusses: Bus[] = [];
  findBusId: number;

  fetchedTickets: Ticket[] = [];
  dateOfJourney: Date;

  constructor(private adminService: AdminService, private busService: BusService, private router: Router) {  }

  bookingBus(bookBusForm: NgForm) {
    if (bookBusForm.valid) {
      this.isAddBushidden = true;
      this.isBookinghidden = false;
      this.ispreferredbushidden = true;
      this.isupDateRoutehidden = true;
      this.iscusthidden = true;
      this.isNoBooking = true;
    }

    this.adminService.getTicketBasedOnBusAndDate(this.bookBus.busId, this.dateOfJourney).subscribe(
      fetchedTicketList => {
        this.fetchedTickets = fetchedTicketList;
        console.log(this.fetchedTickets);
      }
    );

  }
  functionCall1() {
    this.isAddBushidden = false;
    this.isBookinghidden = true;
    this.ispreferredbushidden = true;
    this.isupDateRoutehidden = true;
    this.iscusthidden = true;
    this.isNoBooking = true;

    this.adminService.addorUpdateBus(this.addBus).subscribe(
      addedBus => {
        this.busadded = addedBus;
        console.log(this.busadded);
      }
    );


  }

  functionCall2() {
    this.ispreferredbushidden = false;
    this.isAddBushidden = true;
    this.isBookinghidden = true;
    this.isupDateRoutehidden = true;
    this.iscusthidden = true;
    this.isNoBooking = true;

  }

  findBusByBusId(findBusId) {
    this.busService.getBusById(findBusId).subscribe(
      fetchedBus => {
        this.fetchedBus = fetchedBus;
        console.log(this.fetchedBus);
      }
    );
  }

  changeBus(updateBusForm: NgForm) {
    if (!updateBusForm.valid) {
      this.isupDateRoutehidden = false;
      this.ispreferredbushidden = true;
      this.isAddBushidden = true;
      this.isBookinghidden = true;
      this.iscusthidden = true;
      this.isNoBooking = true;
    }
    else {
      this.adminService.updateBus(this.fetchedBus.busId, this.fetchedBus.source, this.fetchedBus.destination, this.fetchedBus.fare).subscribe(
        updatedResult => {
          if (updatedResult == 0) {
            document.getElementById("updateMessage").innerHTML = "Bus not Updated";
          }
          else {
            document.getElementById("updateMessage").innerHTML = "Bus  Updated";
          }
        }
      );
    }
  }

  regCustomer() {
    this.isupDateRoutehidden = true;
    this.ispreferredbushidden = true;
    this.isAddBushidden = true;
    this.isBookinghidden = true;
    this.iscusthidden = false;
    this.isNoBooking = true;


    this.adminService.viewRegisterCustomer().subscribe(
      fetchedUser => {
        this.userList = fetchedUser;
        console.log(this.userList);
      }
    );



  }
  noBooking() {
    this.isupDateRoutehidden = true;
    this.ispreferredbushidden = true;
    this.isAddBushidden = true;
    this.isBookinghidden = true;
    this.iscusthidden = true;
    this.isNoBooking = false;


    this.adminService.viewRegisterCustomerWithNoBooking().subscribe(
      fetchedUser => {
        this.userLists = fetchedUser;
        console.log(this.userLists);
      }
    );



  }

  date = new Date('1995-12-17');


  adminId = Number(sessionStorage.getItem("adminId"));
  busList: Bus[];


  ngOnInit(): void {

    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the bookinh tab, and add an "active" class to the link that opened the tab
    document.getElementById("Booking").style.display = "block";

    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
    document.getElementById('bookBtn').classList.add("active");

    this.adminService.viewAllBuses().subscribe(
      fetchedbuses => {
        this.busList = fetchedbuses;
        // console.log(this.busList);
      }
    );

    this.adminService.mostPerfferedBus().subscribe(
      fetchedBus => {
        this.mostbus = fetchedBus;
        

        this.mostbus=fetchedBus;
        for (let i = 0; i < fetchedBus.length; i++) {
         this.busService.getBusById(fetchedBus[i]).subscribe(
           fetchedBusById=>{
             this.mostPreferredBusses.push(fetchedBusById);
           }
         );
        }

      }
    );
  }


  openTab(evt: Event, name: string, btnClass: string) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";

    //add class to button
    document.getElementById(btnClass).classList.add("active");
  }

  //#addbus
  checkBus(form: NgForm) {
    if (!form.valid) {
      this.isAddBushidden = true;

    }

  }
  signOut() {
    console.log(this.loggedInAdminId);
    sessionStorage.clear();
    this.router.navigate(['homeLink']);
  }
}
