import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Eleve } from '../eleve.model';

@Component({
  selector: 'app-edit-eleve',
  templateUrl: './edit-eleve.component.html',
  styleUrls: ['./edit-eleve.component.css']
})
export class EditEleveComponent implements OnInit {
  eleve!: Eleve | undefined;

  nomEleve?: string;
  prenomEleve?:string;
  adresseEleve?: string;

  constructor(
    private elevesService: ElevesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getEleve();
  }

  getEleve() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.elevesService
      .getEleve(id)
      .subscribe((eleve) => {
        this.eleve = eleve;

        this.nomEleve = eleve?.nom;
        this.prenomEleve = eleve?.prenom;
        this.adresseEleve = eleve?.adresse;
      });
  }

  onSaveEleve() {
    if (!this.eleve) return;

    if (this.nomEleve) {
      this.eleve.nom = this.nomEleve;
    }

    if (this.prenomEleve) {
      this.eleve.prenom = this.prenomEleve;
    }

    if (this.adresseEleve) {
      this.eleve.adresse = this.adresseEleve;
    }
    this.elevesService
      .updateEleve(this.eleve)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/eleve']);
      });
  }
}
