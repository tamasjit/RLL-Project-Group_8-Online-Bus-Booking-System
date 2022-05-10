import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../Bus';

import { BookaTicketDto } from '../model/BookaTicketDto';
import { Ticket } from '../model/Ticket';
import { Passenger } from '../passenger';


@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private httpClient:HttpClient) { }

  searchBusList(source:string,destination:string):Observable<Bus[]>{
    return this.httpClient.get<Bus[]>("http://localhost:9090/searchbus?source="+source+"&destination="+destination);
  }

  fetchBookedSeats(dateOfJourney:Date,busId:number):Observable<string[]>{
    return this.httpClient.get<string[]>("http://localhost:9090/fetchbookedseats?travelDate="+dateOfJourney+"&busId="+busId);
  }

  getBusById(busId:number):Observable<Bus>{
    return this.httpClient.get<Bus>("http://localhost:9090/getbusbyid?busId="+busId);
  }

  bookATicket(bookATicket:BookaTicketDto,userId:number,busId:number):Observable<Ticket>{
    return this.httpClient.post<Ticket>("http://localhost:9090/bookaticket?userId="+userId+"&busId="+busId,bookATicket);
  }

  getBusByticketId(ticketId:number):Observable<Bus>{
    return this.httpClient.get<Bus>("http://localhost:9090/getBusByTicketId?ticketId="+ticketId);
}
}