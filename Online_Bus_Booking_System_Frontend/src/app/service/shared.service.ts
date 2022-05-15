import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class SharedService{
  ROOT_URL:String="http://obsbus-env.eba-39b63ghj.us-east-1.elasticbeanstalk.com";
  //ROOT_URL:String="http://localhost:5000";
  constructor(private httpClient: HttpClient) { }
  viewAllBusSource():Observable<any[]> {
    return this.httpClient.get<any[]>(this.ROOT_URL+"/viewallbussource");
  }
  viewAllBusDestination():Observable<any[]> {
    return this.httpClient.get<any[]>(this.ROOT_URL+"/viewallbusdestination");
  }

}