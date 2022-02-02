import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Matiere } from '../matieres/matiere.model';
import { LoggingService } from './logging.service';
import { bdInitialMatieres } from './data_m';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  matieres:Matiere[] = [];

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

  url = "http://localhost:8010/api/matieres";

  getMatieres():Observable<Matiere[]> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Matiere[]>(this.url);
  }

  getMatieresPagine(page:number, limit:number):Observable<any> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Matiere[]>(`${this.url}?page=${page}&limit=${limit}`);
  }
  getMatiere(id:number):Observable<Matiere|undefined> {

    //const a:Assignment|undefined = this.assignments.find(elem => elem.id == id);

    //return of(a);
    return this.http.get<Matiere>(this.url + "/" + id)
    .pipe(
      map(a => {

        return a;
      }),
      tap(a => {
        console.log("Tap : reçu matiere de nom = " + a.name);
      }),
      catchError(this.handleError<any>('### catchError: getMatieres by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  addMatiere(matiere:Matiere):Observable<any> {
    // typiquement, plus tard, au lieu de faire un push, on fera une requête
    // vers un service distant
    matiere.id = Math.floor(10000000 * Math.random());

    //this.assignments.push(assignment);

  

    //return of("Assignment " + assignment.nom + " ajouté");

    return this.http.post(this.url, matiere);
  }

  updateMatiere(matiere:Matiere):Observable<any> {
    // Ici plus tard requête distante sur web service en PUT

    // avec le tableau, comme l'assignment est un pointeur sur une case, on a rien besoin
    // de faire....
    //return of("Assignment " + assignment.nom + " modifié");

    return this.http.put<Matiere>(this.url, matiere);
  }

  deleteMatiere(matiere:Matiere) :Observable<any>{
    // on supprime cet assignment
    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    //return of("Assignment " + assignment.nom + " supprimé");

    return this.http.delete(this.url + "/" + matiere._id);
  }

  peuplerBD() {
    bdInitialMatieres.forEach(a => {
        let nouvelMatiere = new Matiere();
        nouvelMatiere.name = a.name;
        nouvelMatiere.id = a.id;
        nouvelMatiere.image = a.image;
        nouvelMatiere.prof = a.prof;

        
        this.addMatiere(nouvelMatiere)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }

    // permet de renvoyer un Observable quand tout est fini
    peuplerBDAvecForkJoin(): Observable<any> {
      const appelsVersAddMatiere:any = [];

      bdInitialMatieres.forEach((a) => {
        let nouvelMatiere = new Matiere();
        nouvelMatiere.name = a.name;
        nouvelMatiere.id = a.id;
        nouvelMatiere.image = a.image;
        nouvelMatiere.prof = a.prof;

        appelsVersAddMatiere.push(this.addMatiere(nouvelMatiere));
      });
      return forkJoin(appelsVersAddMatiere); // renvoie un seul Observable pour dire que c'est fini
    }

}
