import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatieresService } from '../shared/matieres.service';
import { Matiere } from './matiere.model';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  titre = 'Liste des matieres :';
  //ajoutActive = false;

  matiereSelectionne?: Matiere;
  matieres: Matiere[] = [];

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
    private MatieresService: MatieresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // appelé juste avant l'affichage
    // On utilise le service pour récupérer le tableau
    // des assignments
    this.getMatieres(this.page, this.limit);

    console.log('APPEL à getMatieres terminé');
  }

  getMatieres(page:number, limit:number) {
    this.MatieresService
      .getMatieresPagine(page, limit)
      .subscribe((data) => {
        this.matieres = data.docs; // les assignments
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
  getMatiereColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  matiereClique(matiere: Matiere) {
    this.matiereSelectionne = matiere;
    console.log('matiere clique = ' + matiere.name);
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
  onDeleteMatiere(matiere: Matiere) {
    // on supprime cet assignment
    this.MatieresService
      .deleteMatiere(matiere)
      .subscribe((message) => {
        console.log(message);
      });
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();

    this.MatieresService.peuplerBDAvecForkJoin().subscribe(() => {
      // replaceUrl = true force le refresh de la page même si elle est
      // actuellement affichée
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  pagePrecedente() {
    this.getMatieres(this.prevPage, this.limit);
  }
  
  pageSuivante() {
      this.getMatieres(this.nextPage, this.limit);
  }
}

