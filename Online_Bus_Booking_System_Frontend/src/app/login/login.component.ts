import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../User';
import { Router } from '@angular/router';
import { LoginDto } from '../model/LoginDto';
import { UserService } from '../service/user.service';

import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  user: User = new User();

  loginDto: LoginDto = new LoginDto();


  constructor(private service: UserService, private router: Router, private serviceAdmin: AdminService) { } //injected router object



  ngOnInit(): void {
  }

  checkLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.service.loginUser(this.loginDto).subscribe(
        loginUser => {
          console.log(loginUser);
          if (loginUser == true) {
            sessionStorage.setItem("userId", this.loginDto.id.toString());
            sessionStorage.setItem("status", true.valueOf.toString());
            this.router.navigate(['userDashBoard'])
              .then(() => {
                window.location.reload();
              });

          } else if (loginUser == false) {

            this.serviceAdmin.loginAdmin(this.loginDto).subscribe(
              loginAdmin => {
                console.log(loginAdmin);
                if (loginAdmin == true) {
                  sessionStorage.setItem("adminId", this.loginDto.id.toString());
                  this.router.navigate(['adminDashBoardLink']);
                }
                else {
                  document.getElementById("allmsg").innerHTML = "Invalid password or userid";
                }
              }
            );
          }
        }
      );

    } else {

      document.getElementById("allmsg").innerHTML = " Please fill all the details";
    }
  }



}
