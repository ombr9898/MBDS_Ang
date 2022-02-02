import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Eleve } from '../eleves/eleve.model';
import { LoggingService } from './logging.service';
import { bdInitialEleves } from './data_e';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  eleves:Eleve[] = [];

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

  url = "http://localhost:8010/api/eleves";

  getEleves():Observable<Eleve[]> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Eleve[]>(this.url);
  }

  getElevesPagine(page:number, limit:number):Observable<any> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Eleve[]>(`${this.url}?page=${page}&limit=${limit}`);
  }
  getEleve(id:number):Observable<Eleve|undefined> {

    //const a:Assignment|undefined = this.assignments.find(elem => elem.id == id);

    //return of(a);
    return this.http.get<Eleve>(this.url + "/" + id)
    .pipe(
      map(a => {
        return a;
      }),
      tap(a => {
        console.log("Tap : reçu eleve de nom = " + a.nom);
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

  addEleve(eleve:Eleve):Observable<any> {
    // typiquement, plus tard, au lieu de faire un push, on fera une requête
    // vers un service distant
    eleve.id = Math.floor(10000000 * Math.random());

    //this.assignments.push(assignment);

    //return of("Assignment " + assignment.nom + " ajouté");

    return this.http.post(this.url, eleve);
  }

  updateEleve(eleve:Eleve):Observable<any> {
    // Ici plus tard requête distante sur web service en PUT

    // avec le tableau, comme l'assignment est un pointeur sur une case, on a rien besoin
    // de faire....
    //return of("Assignment " + assignment.nom + " modifié");

    return this.http.put<Eleve>(this.url, eleve);
  }

  deleteEleve(eleve:Eleve) :Observable<any>{
    // on supprime cet assignment
    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    //return of("Assignment " + assignment.nom + " supprimé");

    return this.http.delete(this.url + "/" + eleve._id);
  }

  peuplerBD() {
    bdInitialEleves.forEach(a => {
        let nouvelEleve = new Eleve();
        nouvelEleve.nom = a.nom;
        nouvelEleve.id = a.id;
        nouvelEleve.prenom = a.prenom;
        nouvelEleve.adresse = a.adresse;

        
        this.addEleve(nouvelEleve)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }

    // permet de renvoyer un Observable quand tout est fini
    peuplerBDAvecForkJoin(): Observable<any> {
      const appelsVersAddEleve:any = [];

      bdInitialEleves.forEach((a) => {
        const nouvelEleve = new Eleve();

        nouvelEleve.nom = a.nom;
        nouvelEleve.id = a.id;
        nouvelEleve.prenom = a.prenom;
        nouvelEleve.adresse = a.adresse;

        appelsVersAddEleve.push(this.addEleve(nouvelEleve));
      });
      return forkJoin(appelsVersAddEleve); // renvoie un seul Observable pour dire que c'est fini
    }

}
