import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfsService } from 'src/app/shared/profs.service';
import { Prof } from '../prof.model';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css']
})
export class AddProfComponent implements OnInit {
  nomProf = ""; // champ du formulaire
  prenomProf ="";
  adresseProf ="";
  photoProf="";

  constructor(private profsService:ProfsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {
    const newProf:Prof = new Prof();

    newProf.nom = this.nomProf;
    newProf.prenom = this.prenomProf;
    newProf.adresse = this.adresseProf;
    newProf.photo = this.photoProf;

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    //this.nouvelAssignment.emit(newAssignment);

    // On utilise directement le service.
    this.profsService.addProf(newProf)
    .subscribe(reponse => {
      console.log(reponse.message);

      // On re-affiche la liste
      this.router.navigate(['/prof']);
    })
  }
}
