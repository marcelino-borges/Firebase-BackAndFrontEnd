import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  errorMessage: any;

  constructor(private http: HttpClient) { }

  url: string = 'https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users';

  ngOnInit(): void { }

  onSubmit(form): void {


    const headers = { 'content-type': 'application/json' };
    // var formJson = JSON.stringify(form.value);
    console.log(form.value["nome"]);

    var user: User = {
      firstName: form.value["nome"],
      lastName: form.value["sobrenome"],
      email: form.value["email"],
      cpf: form.value["cpf"]
    }

    var json = JSON.stringify(user);
    console.log(json);

    this.http.post<any>('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users',
      user).subscribe({
        error: error => {

          this.errorMessage = error.status;
          if (this.errorMessage != 201)
            console.error('There was an error!', this.errorMessage);
        }
      });

  }

}
