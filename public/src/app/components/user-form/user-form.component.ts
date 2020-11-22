import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  errorMessage: any;

  createText: string = "Criar";
  editText: string = "Editar";

  formFuntion: string = "Criar";

  isRegister: boolean;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  url: string = 'https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isRegister = params['type'] == "create";

      if (!this.isRegister)
        this.formFuntion = this.editText;
    });
  }

  onSubmit(form): void {
    if (this.isRegister) {
      this.createUserFromForm(form);
    } else {

    }
  }

  private createUserFromForm(form: any) {
    var user: User = {
      firstName: form.value["nome"],
      lastName: form.value["sobrenome"],
      email: form.value["email"],
      cpf: form.value["cpf"]
    };

    var json = JSON.stringify(user);

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
