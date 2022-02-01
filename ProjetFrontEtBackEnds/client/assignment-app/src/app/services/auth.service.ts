import { User } from '../login/login.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser?:string;
  public loggedIn: Boolean = true;
  public roles?:string[];

   
  constructor(private router: Router,private http:HttpClient) { }
  url = "http://localhost:8010/api/auth/login";


logout() { 
  localStorage.removeItem("access_token");
    this.loggedIn = false;
    alert("Succes !");
  }

  SignIn(user :User):Observable<any>{
    console.log(user)
    
    return this.http.post(this.url, user);
    console.log(this.url,user)
  }

  isAdmin(){
    const isUserAdmin = new Promise((resolve, reject) => {
        resolve(localStorage.getItem('access_token') != null )
    });

    return isUserAdmin;
  }

  

}