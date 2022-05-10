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

  constructor(private httpClient: HttpClient) { }



  loginAdmin(loginDto: LoginDto): Observable<boolean> {
    return this.httpClient.post<boolean>("http://localhost:9090/loginadmin", loginDto);

  }

  viewAllBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>("http://localhost:9090/viewallbuses");
  }

  addorUpdateBus(bus: Bus): Observable<Bus> {
    return this.httpClient.post<Bus>("http://localhost:9090/addorupdatebus", bus);
  }

  viewRegisterCustomer(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:9090/viewallregsiteredcustomers");
  }


  viewRegisterCustomerWithNoBooking(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:9090/viewcustomerwhoregisteredbutwithnobooking");

  }

  mostPerfferedBus(): Observable<number[]> {
    return this.httpClient.get<number[]>("http://localhost:9090/mostpreferredbus");
  }

  updateBus(busId:number,source:string,destination:string,fare:number):Observable<number>{
    return this.httpClient.get<number>("http://localhost:9090/updatebus?busId="+busId+"&source="+source+"&destination="+destination+"&fare="+fare);
  }

  getTicketBasedOnBusAndDate(busId:number,travelDate:Date):Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>("http://localhost:9090/bookingsbasedonperiod?busId="+busId+"&travelDate="+travelDate);
  }

}
