import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { User } from 'src/models/user';

@Component({
  selector: 'app-grid-users',
  templateUrl: './grid-users.component.html',
  styleUrls: ['./grid-users.component.scss']
})
export class GridUsersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    { headerName: 'Nome', field: 'firstName', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Sobrenome', field: 'lastName', sortable: true, filter: true },
    { headerName: 'CPF', field: 'cpf', sortable: true, filter: true },
    { headerName: 'E-mail', field: 'email', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    var users = [];

    this.http.get('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users').subscribe(res => {
      var usersCollection = res["users"];
      for (var key in usersCollection) {
        var user: User = {
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

  editSelectedUser() {
    const jsonUser = this.getSelectedRow();
    this.router.navigate(['/userform/' + JSON.stringify(jsonUser)]);
    
  }

  deleteSelectedUser() {
    const jsonUser = this.getSelectedRow();
    this.http.delete('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/' + jsonUser['cpf']).subscribe(
      res => {
        window.location.reload();
        alert('Usuário removido com sucesso!');
      },
      (error => {
        if (error.status == 204) {
          window.location.reload();
          alert('Usuário removido com sucesso!');
        }
        else {
          alert('Não foi possível remover o usuário!');
        }
      })
    );
    
  }

  getSelectedRow() {
    return (this.agGrid.api.getSelectedNodes())[0].data;
  }

}
