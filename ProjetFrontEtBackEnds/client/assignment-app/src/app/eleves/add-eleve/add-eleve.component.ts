import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Eleve } from '../eleve.model';

@Component({
  selector: 'app-add-eleve',
  templateUrl: './add-eleve.component.html',
  styleUrls: ['./add-eleve.component.css']
})
export class AddEleveComponent implements OnInit {
  nomEleve = ""; // champ du formulaire
  prenomEleve ="";
  adresseEleve ="";

  constructor(private elevesService:ElevesService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {
    const newEleve:Eleve = new Eleve();

    newEleve.nom = this.nomEleve;
    newEleve.prenom = this.prenomEleve;
    newEleve.adresse = this.adresseEleve;

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    //this.nouvelAssignment.emit(newAssignment);

    // On utilise directement le service.
    this.elevesService.addEleve(newEleve)
    .subscribe(reponse => {
      console.log(reponse.message);

      // On re-affiche la liste
      this.router.navigate(['/eleve']);
    })
  }
}
