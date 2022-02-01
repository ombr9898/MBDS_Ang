import { EventEmitter,Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-matiere-detail',
  templateUrl: './matiere-detail.component.html',
  styleUrls: ['./matiere-detail.component.css']
})
export class MatiereDetailComponent implements OnInit {
  matiereTransmis?: Matiere;
  @Output() deleteMatiere = new EventEmitter<Matiere>();

  constructor(
    private matieresService: MatieresService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMatiere();
  }

  getMatiere() {
    // On récupère l'id dans l'URL
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.matieresService.getMatiere(id).subscribe((matiere) => {
      this.matiereTransmis = matiere;
      console.log('nam'+this.matiereTransmis?.name)
    });
  }

  onDelete() {
    if (this.matiereTransmis) {
      this.matieresService
        .deleteMatiere(this.matiereTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.matiereTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/matiere']);
        });
    }
  }

  onClickEdit() {
    if(this.matiereTransmis) {
      // Exemple de navigation vers http://.../assignment/3/edit?nom=Devoir_Buffa&date:31_12...#edition
      this.router.navigate(['/matiere', this.matiereTransmis.id, 'edit'],
      {
        queryParams: {
          name: this.matiereTransmis.name,
          image : this.matiereTransmis.image

        },
        fragment : 'edition'
      });
    }
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}