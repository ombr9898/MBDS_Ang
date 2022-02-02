import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ProfsService } from 'src/app/shared/profs.service';
import { Prof } from '../prof.model';


@Component({
  selector: 'app-prof-detail',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css']
})
export class ProfDetailComponent implements OnInit {
  profTransmis?: Prof;
  @Output() deleteEleve = new EventEmitter<Prof>();

  constructor(
    private profsService: ProfsService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProf();
  }

  getProf() {
    // On récupère l'id dans l'URL
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.profsService.getProf(id).subscribe((prof) => {
      this.profTransmis = prof;
    });
  }

  onDelete() {
    if (this.profTransmis) {
      this.profsService
        .deleteProf(this.profTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.profTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onClickEdit() {
    if(this.profTransmis) {
      // Exemple de navigation vers http://.../assignment/3/edit?nom=Devoir_Buffa&date:31_12...#edition
      this.router.navigate(['/prof', this.profTransmis.id, 'edit'],
      {
        queryParams: {
          nom: this.profTransmis.nom,
          prenom : this.profTransmis.prenom,
          adresse : this.profTransmis.adresse,
          photo : this.profTransmis.photo

        },
        fragment : 'edition'
      });
    }
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}

