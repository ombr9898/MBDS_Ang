import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Eleve } from '../eleve.model';


@Component({
  selector: 'app-eleve-detail',
  templateUrl: './eleve-detail.component.html',
  styleUrls: ['./eleve-detail.component.css']
})

export class EleveDetailComponent implements OnInit {
  eleveTransmis?: Eleve;
  @Output() deleteEleve = new EventEmitter<Eleve>();

  constructor(
    private elevesService: ElevesService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEleve();
  }

  getEleve() {
    // On récupère l'id dans l'URL
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.elevesService.getEleve(id).subscribe((eleve) => {
      this.eleveTransmis = eleve;
    });
  }

  onDelete() {
    if (this.eleveTransmis) {
      this.elevesService
        .deleteEleve(this.eleveTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.eleveTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onClickEdit() {
    if(this.eleveTransmis) {
      // Exemple de navigation vers http://.../assignment/3/edit?nom=Devoir_Buffa&date:31_12...#edition
      this.router.navigate(['/eleve', this.eleveTransmis.id, 'edit'],
      {
        queryParams: {
          nom: this.eleveTransmis.nom,
          prenom : this.eleveTransmis.prenom,
          adresse : this.eleveTransmis.adresse
        },
        fragment : 'edition'
      });
    }
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}
