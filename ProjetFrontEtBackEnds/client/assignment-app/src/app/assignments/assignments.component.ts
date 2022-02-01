import { CdkDragDrop ,moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from '../eleves/eleve.model';
import { Matiere } from '../matieres/matiere.model';
import { Prof } from '../profs/prof.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ElevesService } from '../shared/eleves.service';
import { MatieresService } from '../shared/matieres.service';
import { ProfsService } from '../shared/profs.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments :';
  //ajoutActive = false;

  assignmentSelectionne?: Assignment;
  assignments: Assignment[] = [];
  Rendu:Assignment[] = [];
  NonRendu:Assignment[] = [];
  matieres:Matiere[]=[]
  profs:Prof[]=[]
  eleves:Eleve[]=[]

  // proprietes de pagination
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;
  matiereTransmis?: Matiere;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  private MatieresService:MatieresService,private ProfsService:ProfsService,private matieresService:MatieresService,private elevesService:ElevesService) {}

  ngOnInit(): void {
    // appelé juste avant l'affichage
    // On utilise le service pour récupérer le tableau
    // des assignments
    this.NonRendu=[]
    this.Rendu=[]
    this.getAssignments(this.page, this.limit);
    this.getMatieres(this.page,this.limit)
    this.getProfs(this.page, this.limit)
    this.getEleves(this.page,this.limit)
    console.log(this.assignments)
  }
  
  getMatieres(page:number, limit:number) {
    this.MatieresService
      .getMatieresPagine(page, limit)
      .subscribe((data) => {
        this.matieres = data.docs; // les assignments
        this.page = data.page;
        this.limit = data.limit;
      });
  }
  drop(event: CdkDragDrop<Assignment[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.assignmentSelectionne!.rendu = !this.assignmentSelectionne!.rendu;
      this.assignmentsService
        .updateAssignment(this.assignmentSelectionne!)
        .subscribe((reponse) => {
          console.log(reponse.message);
        });
    }
  }
  getAssignments(page:number, limit:number) {
    this.assignmentsService
      .getAssignmentsPagine(page, limit)
      .subscribe((data) => {
        this.assignments = data.docs; // les assignments
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      
      let i 
      for (i in this.assignments){
        if(this.assignments[i].rendu){
          this.Rendu.push(this.assignments[i])
        }
        else{this.NonRendu.push(this.assignments[i])}
      }}
      );
      
  }
  getEleves(page:number, limit:number) {
    this.elevesService
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
    });
  }
  getProfs(page:number, limit:number) {
    this.ProfsService
      .getProfsPagine(page, limit)
      .subscribe((data) => {
        this.profs = data.docs;
      });
  }
  getAssignmentColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }
  

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }
 
  
isLoggedIn():boolean {
  return localStorage.getItem('access_token') != null ;
}
  onDeleteAssignment(assignment: Assignment) {
    // on supprime cet assignment
    this.assignmentsService
      .deleteAssignment(assignment)
      .subscribe((message) => {
      });
  }

  peuplerBD() {

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      // replaceUrl = true force le refresh de la page même si elle est
      // actuellement affichée
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  pagePrecedente() {
    this.Rendu=[]
    this.NonRendu=[]
    this.getAssignments(this.prevPage, this.limit);
  }
  
  pageSuivante() {
    this.Rendu=[]
    this.NonRendu=[]
      this.getAssignments(this.nextPage, this.limit);
  }
}
