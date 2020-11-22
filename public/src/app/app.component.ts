import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'CRUD Sistemas Distribuídos';

  gridApi;
  gridColumnApi;

  columnDefs = [
    { headerName: 'Nome', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Sobrenome',  field: 'lastName', sortable: true, filter: true },
    { headerName: 'CPF',  field: 'cpf', sortable: true, filter: true },
    { headerName: 'E-mail',  field: 'email', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private http: HttpClient) {

  } 

  ngOnInit() {
    this.getUsers();
  }

  getUsers() : void {    
    var users = [];

    this.http.get('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users').subscribe(res => {
      var usersCollection = res["users"];
      for(var key in usersCollection) {
        var user : User = { 
          firstName: usersCollection[key]['firstName'],
          lastName: usersCollection[key]['lastName'],
          cpf: usersCollection[key]['cpf'],
          email: usersCollection[key]['email']
        };
        users.push(user);
      }
      this.rowData = users;
    });
  }
}
