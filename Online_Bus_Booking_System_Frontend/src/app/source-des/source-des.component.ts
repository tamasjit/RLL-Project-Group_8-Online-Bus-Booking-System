import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-source-des',
  templateUrl: './source-des.component.html',
  styleUrls: ['./source-des.component.css']
})
export class SourceDesComponent implements OnInit {
  SourceList: any;
  

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.service.viewAllBusSource().subscribe((data:any)=>{
      this.SourceList=data;
    })
  }
  changeSource(e){
    console.log(e.target.value)
  }

}
