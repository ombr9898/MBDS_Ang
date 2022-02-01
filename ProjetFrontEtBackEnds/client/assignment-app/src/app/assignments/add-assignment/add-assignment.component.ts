import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleve } from 'src/app/eleves/eleve.model';
import { Matiere } from 'src/app/matieres/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir = ""; // champ du formulaire
  dateDeRendu?:Date;
  MatierDevoir= 0;

  matieres: Matiere[] = [];
  // proprietes de pagination
  page: number = 1;
  limit: number = 100;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;
  eleves: Eleve[] = [];

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,private elevesService:ElevesService,private matieresService:MatieresService) { }

  ngOnInit(): void {
                // appelé juste avant l'affichage
                // On utilise le service pour récupérer le tableau
                // des assignments
                this.getMatieres(this.page, this.limit);
                this.getEleves(this.page, this.limit);
                console.log('APPEL à getMatieres terminé');
    }
getMatieres(page:number, limit:number) {
                this.matieresService
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
      console.log('données reçues');
    });
}

  onSubmit(event:Event) {
    var i:any
    for (i in this.eleves){
    const newAssignment:Assignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment._matiere = this.MatierDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    newAssignment._auteur=i
    console.log(newAssignment)
    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);

      // On re-affiche la liste
      this.router.navigate(['/home']);
    })

    }

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    //this.nouvelAssignment.emit(newAssignment);

    // On utilise directement le service.
    
  }

}
