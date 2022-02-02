import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfsService } from '../shared/profs.service';
import { Prof } from './prof.model';

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css']
})
export class ProfsComponent implements OnInit {
  titre = 'Liste des profs :';
  //ajoutActive = false;

  profSelectionne?: Prof;
  profs: Prof[] = [];

  // proprietes de pagination
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;

  constructor(
    private ProfsService: ProfsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // appelé juste avant l'affichage
    // On utilise le service pour récupérer le tableau
    // des assignments
    this.getProfs(this.page, this.limit);

    console.log('APPEL à getProfs terminé');
  }

  getProfs(page:number, limit:number) {
    this.ProfsService
      .getProfsPagine(page, limit)
      .subscribe((data) => {
        this.profs = data.docs; // les assignments
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
      });
  }
  getProfColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  profClique(prof: Prof) {
    this.profSelectionne = prof;
    console.log('prof clique = ' + prof.nom);
  }

  /*
  onNouvelAssignment(assignment:Assignment) {
    // assignment envoyé par le composant add-assignment
    //this.assignments.push(assignment);
    this.assignmentsService.addAssigment(assignment)
    .subscribe(message => {
      console.log(message);

      // IMPORTANT DE LE FAIRE ICI car l'ajout peut prendre plusieurs secondes
      // avec web services et BD distante
       // on cache le formulaire et on affiche la liste
       //this.formVisible = false;
    });
  }
*/
  onDeleteProf(prof: Prof) {
    // on supprime cet assignment
    this.ProfsService
      .deleteProf(prof)
      .subscribe((message) => {
        console.log(message);
      });
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();

    this.ProfsService.peuplerBDAvecForkJoin().subscribe(() => {
      // replaceUrl = true force le refresh de la page même si elle est
      // actuellement affichée
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  pagePrecedente() {
    this.getProfs(this.prevPage, this.limit);
  }
  
  pageSuivante() {
      this.getProfs(this.nextPage, this.limit);
  }
}

