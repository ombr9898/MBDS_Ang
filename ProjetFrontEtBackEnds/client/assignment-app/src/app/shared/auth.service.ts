import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../login/login.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;
  

  constructor(private http:HttpClient) { }
  url = "http://localhost:8010/api/auth/login";
  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass
  logIn(user:User):Observable<any> {
    console.log("TRYING TO LOG IN")
    console.log(this.http.post(this.url, user))
    return this.http.post(this.url, user);
  }

  // appelé par bouton de deconnexion
  logOut() {
    localStorage.removeItem("access_token");
    this.loggedIn = false;
    alert("Succes !");  
  }

  // vérification du rôle. Dans cet exemple simple on dit qu'on est admin
  // juste si on est loggué. Dans la vraie vie, il faudrait vérifier que le
  // login est bien égal à admin etc.
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....
        resolve(localStorage.getItem('access_token')!=null);
    });

    return isUserAdmin;
  }

}
