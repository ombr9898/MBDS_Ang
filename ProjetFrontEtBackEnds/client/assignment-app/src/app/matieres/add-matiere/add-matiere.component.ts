import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prof } from 'src/app/profs/prof.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { ProfsService } from 'src/app/shared/profs.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent implements OnInit {
  nameMatiere=""
  fileToUpload!:File;
  imageUrl="/assets/image/img.jpg"
  profMatiere=parseInt("")
  
  
  constructor(private matieresService:MatieresService,
              private router:Router,private profService:ProfsService
              ) { }
profs: Prof[] = [];
              // proprietes de pagination
              page: number = 1;
              limit: number = 100;
              totalDocs?: number;
              totalPages?: number;
              hasPrevPage?: boolean;
              prevPage!: number;
              hasNextPage?: boolean;
              nextPage!: number;
  ngOnInit(): void {
                // appelé juste avant l'affichage
                // On utilise le service pour récupérer le tableau
                // des assignments
                this.getProfs(this.page, this.limit);
            
                console.log('APPEL à getProfs terminé');
              }
            
              getProfs(page:number, limit:number) {
                this.profService
                  .getProfsPagine(page, limit)
                  .subscribe((data) => {
                    this.profs = data.docs; // les assignments
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
  
  h(file:FileList){
    this.fileToUpload!=file.item(0)
    var reader=new FileReader
    reader.onload=(event:any)=>{
      this.imageUrl="/assets/image/img.jpg"
    }
    reader.readAsDataURL(this.fileToUpload)
   
  }
  
  onSubmit(event:Event) {
    const NewMatiere:Matiere = new Matiere();
    NewMatiere.name = this.nameMatiere;
    NewMatiere.image = this.imageUrl;
    NewMatiere.prof = this.profMatiere;

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    //this.nouvelAssignment.emit(newAssignment);

    // On utilise directement le service.
    this.matieresService.addMatiere(NewMatiere)
    .subscribe(reponse => {
      console.log(reponse.message);

      // On re-affiche la liste
      this.router.navigate(['/home']);
    })
  }
}