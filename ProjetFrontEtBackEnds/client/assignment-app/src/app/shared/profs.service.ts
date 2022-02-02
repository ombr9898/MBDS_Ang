import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Prof } from '../profs/prof.model';
import { LoggingService } from './logging.service';
import { bdInitialProfs } from './data_p';

@Injectable({
  providedIn: 'root'
})
export class ProfsService {
  profs:Prof[] = [];

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

  url = "http://localhost:8010/api/profs";

  getProfs():Observable<Prof[]> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Prof[]>(this.url);
  }

  getProfsPagine(page:number, limit:number):Observable<any> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Prof[]>(`${this.url}?page=${page}&limit=${limit}`);
  }
  getProf(id:number):Observable<Prof|undefined> {

    //const a:Assignment|undefined = this.assignments.find(elem => elem.id == id);

    //return of(a);
    return this.http.get<Prof>(this.url + "/" + id)
    .pipe(
      map(a => {
        
        return a;
      }),
      tap(a => {
        console.log("Tap : reçu prof de nom = " + a.nom);
      }),
      catchError(this.handleError<any>('### catchError: getEleves by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  addProf(prof:Prof):Observable<any> {
    // typiquement, plus tard, au lieu de faire un push, on fera une requête
    // vers un service distant
    prof.id = Math.floor(10000000 * Math.random());

    //this.assignments.push(assignment);

   

    //return of("Assignment " + assignment.nom + " ajouté");

    return this.http.post(this.url, prof);
  }

  updateProf(prof:Prof):Observable<any> {
    // Ici plus tard requête distante sur web service en PUT

    // avec le tableau, comme l'assignment est un pointeur sur une case, on a rien besoin
    // de faire....
    //return of("Assignment " + assignment.nom + " modifié");

    return this.http.put<Prof>(this.url, prof);
  }

  deleteProf(prof:Prof) :Observable<any>{
    // on supprime cet assignment
    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    //return of("Assignment " + assignment.nom + " supprimé");

    return this.http.delete(this.url + "/" + prof._id);
  }

  peuplerBD() {
    bdInitialProfs.forEach(a => {
        let nouvelProf = new Prof();
        nouvelProf.nom = a.nom;
        nouvelProf.id = a.id;
        nouvelProf.prenom = a.prenom;
        nouvelProf.adresse = a.adresse;
        nouvelProf.photo = a.photo;

        
        this.addProf(nouvelProf)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }

    // permet de renvoyer un Observable quand tout est fini
    peuplerBDAvecForkJoin(): Observable<any> {
      const appelsVersAddProf:any = [];

      bdInitialProfs.forEach((a) => {
        const nouvelProf = new Prof();

        nouvelProf.nom = a.nom;
        nouvelProf.id = a.id;
        nouvelProf.prenom = a.prenom;
        nouvelProf.adresse = a.adresse;
        nouvelProf.photo = a.photo;

        appelsVersAddProf.push(this.addProf(nouvelProf));
      });
      return forkJoin(appelsVersAddProf); // renvoie un seul Observable pour dire que c'est fini
    }

}
