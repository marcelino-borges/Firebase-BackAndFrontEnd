import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: 'userform', component:  UserFormComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
