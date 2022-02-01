import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { User } from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:8010/api/users";
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUsersPagine(page:number, limit:number):Observable<any> {
    return this.http.get<User[]>(`${this.url}`);
  }
  getUser(id:number):Observable<User|undefined> {
    return this.http.get<User>(this.url + "/" + id)
      .pipe(
        map(a => {
          return a;
        }),
      );
  }

}
