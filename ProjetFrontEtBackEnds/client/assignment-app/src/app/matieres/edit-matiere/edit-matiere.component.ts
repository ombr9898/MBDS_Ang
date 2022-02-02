import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css']
})
export class EditMatiereComponent implements OnInit {
  matiere!: Matiere | undefined;
  nameMatiere?: string;
  profMatiere?: number;
  imageMatiere?: string;

  constructor(
    private matieresService: MatieresService,
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

    this.getMatiere();
  }

  getMatiere() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.matieresService
      .getMatiere(id)
      .subscribe((matiere) => {
        this.matiere = matiere;

        this.nameMatiere = matiere?.name;
        this.profMatiere = matiere?.prof;
        this.imageMatiere = matiere?.image;
      });
  }

  onSaveMatiere() {
    if (!this.matiere) return;

    if (this.nameMatiere) {
      this.matiere.name = this.nameMatiere;
    }

    if (this.profMatiere) {
      this.matiere.prof = this.profMatiere;
    }

    if (this.imageMatiere) {
      this.matiere.image = this.imageMatiere;
    }
    this.matieresService
      .updateMatiere(this.matiere)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/matiere']);
      });
  }
}

