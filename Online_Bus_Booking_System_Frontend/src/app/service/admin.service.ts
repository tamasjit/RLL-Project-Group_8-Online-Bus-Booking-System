import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../User';
import { LoginDto } from '../model/LoginDto';
import { Bus } from '../Bus';
import { Ticket } from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  ROOT_URL:String="http://obsbus-env.eba-39b63ghj.us-east-1.elasticbeanstalk.com";
  //ROOT_URL:String="http://localhost:5000";

  constructor(private httpClient: HttpClient) { }



  loginAdmin(loginDto: LoginDto): Observable<boolean> {
    return this.httpClient.post<boolean>(this.ROOT_URL+"/loginadmin", loginDto);

  }

  viewAllBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(this.ROOT_URL+"/viewallbuses");
  }

  addorUpdateBus(bus: Bus): Observable<Bus> {
    return this.httpClient.post<Bus>(this.ROOT_URL+"/addorupdatebus", bus);
  }

  viewRegisterCustomer(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.ROOT_URL+"/viewallregsiteredcustomers");
  }


  viewRegisterCustomerWithNoBooking(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.ROOT_URL+"/viewcustomerwhoregisteredbutwithnobooking");

  }

  mostPerfferedBus(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.ROOT_URL+"/mostpreferredbus");
  }

  updateBus(busId:number,source:string,destination:string,fare:number):Observable<number>{
    return this.httpClient.get<number>(this.ROOT_URL+"/updatebus?busId="+busId+"&source="+source+"&destination="+destination+"&fare="+fare);
  }

  getTicketBasedOnBusAndDate(busId:number,travelDate:Date):Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(this.ROOT_URL+"/bookingsbasedonperiod?busId="+busId+"&travelDate="+travelDate);
  }

}
