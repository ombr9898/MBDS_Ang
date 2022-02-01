import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion des Assignments";

  constructor(private authService:AuthService, private router:Router) {}

  login() {
    if(!this.authService.loggedIn) {
    } else {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }
  logout(){
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }
  isLoggedIn():boolean {
    return localStorage.getItem('access_token') != null ;
  }
  
}
