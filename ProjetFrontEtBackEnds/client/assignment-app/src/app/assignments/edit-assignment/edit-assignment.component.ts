import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/eleves/eleve.model';
import { Matiere } from 'src/app/matieres/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment?: string;
  matiereAssignment?: number;
  dateDeRendu?: Date;
  auteur?: number;
  note?: number;
  remarque?: string;
  matieres:Matiere[]=[];
  eleves: Eleve[] = [];
  
  page: number = 1;
  limit: number = 100;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;



  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router, private elevesService:ElevesService,
    private matieresService:MatieresService,
  ) {}

  ngOnInit(): void {

    this.getAssignment();
    this.getMatieres(this.page, this.limit);
   this.getEleves(this.page, this.limit);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;

        this.nomAssignment = assignment?.nom;
        this.matiereAssignment=assignment?._matiere;
        this.dateDeRendu = assignment?.dateDeRendu;
        this.auteur = assignment?._auteur;
        this.note=assignment?.note;
        this.remarque = assignment?.remarque;
      });
  }
  getMatieres(page:number, limit:number) {
    this.matieresService
      .getMatieresPagine(page, limit)
      .subscribe((data) => {
        this.matieres = data.docs; 
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

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.note) {
      this.assignment.note = this.note;
    }
    if (this.remarque) {
      this.assignment.remarque = this.remarque;
    }
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
