import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../Bus';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-searched-bus-list',
  templateUrl: './searched-bus-list.component.html',
  styleUrls: ['./searched-bus-list.component.css']
})
export class SearchedBusListComponent implements OnInit {
  source: string = "";
  destination: string = "";
  dateOfJourney;
  dateValue: any;
  busList: Bus[];
  selectedBusId: number;

  constructor(private busService: BusService, private router: Router) {

  }


  ngOnInit(): void {
    this.source = String(sessionStorage.getItem('source'));
    this.destination = String(sessionStorage.getItem('destination'));
    this.dateValue = Date.parse(sessionStorage.getItem('dateOfJourney'));
    this.dateOfJourney = new Date(this.dateValue).toLocaleDateString();

    this.busService.searchBusList(this.source, this.destination).subscribe(
      fetchedBusList => {
        this.busList = fetchedBusList;
        console.log(this.busList);
      }
    );
  }


  busSelect(busID) {
    this.selectedBusId = busID;
    sessionStorage.setItem("selectedBusId", this.selectedBusId.toString());

    this.router.navigate(['seatBookingLink']).then(() => {
      window.location.reload();
    });
  }

}
