import { AssignmentsComponent } from "./assignments.component";

export class Assignment {
  nom!:string;
  dateDeRendu?:Date;
  rendu?:boolean;
  id!:number;
  _id?:string;
  _auteur!:number;
  _matiere!:number;
  note!:number;
  remarque!:string;
}


