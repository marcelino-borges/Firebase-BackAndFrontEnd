import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GridUsersComponent } from './components/grid-users/grid-users.component';

const routes: Routes = [
  { path: '', component:  GridUsersComponent},
  { path: 'userform', component:  UserFormComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
