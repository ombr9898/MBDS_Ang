import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { MatieresComponent } from './matieres/matieres.component';
import { MatiereDetailComponent } from './matieres/matiere-detail/matiere-detail.component';
import { LoginComponent } from './login/login.component';
import { EditMatiereComponent } from './matieres/edit-matiere/edit-matiere.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { ProfsComponent } from './profs/profs.component';
import { ProfDetailComponent } from './profs/prof-detail/prof-detail.component';
import { AddProfComponent } from './profs/add-prof/add-prof.component';
import { EditProfComponent } from './profs/edit-prof/edit-prof.component';
import { ElevesComponent } from './eleves/eleves.component';
import { EditEleveComponent } from './eleves/edit-eleve/edit-eleve.component';
import { AddEleveComponent } from './eleves/add-eleve/add-eleve.component';
import { EleveDetailComponent } from './eleves/eleve-detail/eleve-detail.component';

const routes:Routes = [
  {
    path:"", component: LoginComponent
  },
  {
    path:"home", component: AssignmentsComponent
  },
  {
    path:"assignment", component: AssignmentsComponent
  },
  {
    path:"prof", component: ProfsComponent
  },
  {
    path:"prof/:id", component: ProfDetailComponent
  },
  {
    path:"matiere", component: MatieresComponent
  },
  {
    path:"matiere/:id", component: MatiereDetailComponent
  },
  {
    path:"eleve", component: ElevesComponent
  },
  {
    path:"eleve/:id", component: EleveDetailComponent
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"add-assignment", component: AddAssignmentComponent
  },
  {
    path:"assignment/:id", component: AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit", component: EditAssignmentComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"add-matiere", component: AddMatiereComponent
  },
  {
    path:"matiere/:id", component: MatiereDetailComponent
  },
  {
    path:"matiere/:id/edit", component: EditMatiereComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"add-prof", component: AddProfComponent
  },
  {
    path:"prof/:id", component: ProfDetailComponent
  },
  {
    path:"prof/:id/edit", component: EditProfComponent,
    canActivate : [AuthGuard]
  },
   {
    path:"add-eleve", component: AddEleveComponent
  },
  {
    path:"eleve/:id", component: EleveDetailComponent
  },
  {
    path:"eleve/:id/edit", component: EditEleveComponent,
    canActivate : [AuthGuard]
  },
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    MatieresComponent,
    MatiereDetailComponent,
    LoginComponent,
    EditMatiereComponent,
    AddMatiereComponent,
    ProfsComponent,
    ProfDetailComponent,
    AddProfComponent,
    EditProfComponent,
    ElevesComponent,
    EditEleveComponent,
    AddEleveComponent,
    EleveDetailComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
