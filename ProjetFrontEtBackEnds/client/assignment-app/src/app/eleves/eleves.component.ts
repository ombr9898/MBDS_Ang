import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElevesService } from '../shared/eleves.service';
import { Eleve } from './eleve.model';

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css']
})
export class ElevesComponent implements OnInit {
  titre = 'Liste des eleves :';
  //ajoutActive = false;

  eleveSelectionne?: Eleve;
  eleves: Eleve[] = [];

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
    private ElevesService: ElevesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // appelé juste avant l'affichage
    // On utilise le service pour récupérer le tableau
    // des assignments
    this.getEleves(this.page, this.limit);

    console.log('APPEL à getEleves terminé');
  }

  getEleves(page:number, limit:number) {
    this.ElevesService
      .getElevesPagine(page, limit)
      .subscribe((data) => {
        this.eleves = data.docs; // les assignments
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
  getEleveColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  eleveClique(eleve: Eleve) {
    this.eleveSelectionne = eleve;
    console.log('eleve clique = ' + eleve.nom);
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
  onDeleteEleve(eleve: Eleve) {
    // on supprime cet assignment
    this.ElevesService
      .deleteEleve(eleve)
      .subscribe((message) => {
        console.log(message);
      });
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();

    this.ElevesService.peuplerBDAvecForkJoin().subscribe(() => {
      // replaceUrl = true force le refresh de la page même si elle est
      // actuellement affichée
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  pagePrecedente() {
    this.getEleves(this.prevPage, this.limit);
  }
  
  pageSuivante() {
      this.getEleves(this.nextPage, this.limit);
  }
}
