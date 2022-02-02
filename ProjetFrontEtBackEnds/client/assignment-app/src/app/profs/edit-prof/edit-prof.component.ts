import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfsService } from 'src/app/shared/profs.service';
import { Prof } from '../prof.model';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.css']
})
export class EditProfComponent implements OnInit {
  prof!: Prof | undefined;
  nomProf?: string;
  prenomProf?:string;
  adresseProf?:string;
  photoProf?: string;

  constructor(
    private profsService: ProfsService,
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

    this.getProf();
  }

  getProf() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.profsService
      .getProf(id)
      .subscribe((prof) => {
        this.prof = prof;

        this.nomProf = prof?.nom;
        this.prenomProf = prof?.prenom;
        this.adresseProf = prof?.adresse;
        this.photoProf=prof?.photo
      });
  }

  onSaveProf() {
    if (!this.prof) return;

    if (this.nomProf) {
      this.prof.nom = this.nomProf;
    }

    if (this.prenomProf) {
      this.prof.prenom = this.prenomProf;
    }

    if (this.adresseProf) {
      this.prof.adresse = this.adresseProf;
    }
    if (this.photoProf) {
      this.prof.photo = this.photoProf;
    }
    this.profsService
      .updateProf(this.prof)
      .subscribe(reponse => {
        console.log(reponse.message);
        // navigation vers la home page
        this.router.navigate(['/prof']);
      });
  }
}