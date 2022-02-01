import { Component, OnInit } from '@angular/core';
import { User } from './login.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggingService } from '../shared/logging.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(private authService : AuthService,private loggingService:LoggingService,public router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    console.log(this.user)
    this.authService.SignIn(this.user)
    .subscribe(response => {
      if(response.access_token){
        this.authService.loggedIn;
        localStorage.setItem('access_token', response.access_token);
      }
        localStorage.setItem('access_token', response.access_token);
        console.log(localStorage.getItem('access_token'))
        this.router.navigate(['/home']);
      })
      }

    }
