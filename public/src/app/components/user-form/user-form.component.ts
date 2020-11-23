import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  fieldFirstName: string = "";
  fieldLastName: string = "";
  fieldCpf: string = "";
  fieldEmail: string = "";
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isRegister = params['type'] == "create";

      if (!this.isRegister) {
        this.formFuntion = this.editText;
        var user = JSON.parse( params['type']);
        this.setFormWithUserData(user);
      }
        
    });

  }

  onSubmit(form): void {
    var user: User = this.createUserFromForm(form);

    if (this.isRegister) {
      this.createUserOnBackEnd(user);
    } else {
      this.editUserOnBackEnd(user);
    }
  }

  private createUserOnBackEnd(user: User) {
    var json = JSON.stringify(user);

    this.http.post<any>('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users',
      user).subscribe(
        res => alert("Usuário cadastrado com sucesso!"),
        error => {
          this.errorMessage = error.status;
          if (this.errorMessage != 201) {
            alert("Não foi possível cadastrar o usuário.");
            console.error('Ocorreu um erro ao criar usuário no Back End', this.errorMessage);
          }
          else 
            alert("Usuário cadastrado com sucesso!");
        }
      );
  }

  private editUserOnBackEnd(user: User) {
    var json = JSON.stringify(user);
    console.log(user.cpf);
    console.log(json);
    
    this.http.patch('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/' + user.cpf , json).subscribe(
      res => {
        alert("Usuário alterado com sucesso!");
        this.router.navigate(['']);
      },
      error => {
        this.errorMessage = error.status;
        if (this.errorMessage != 204) {
          alert("Não foi possível alterar o usuário.");
        } else {
          alert("Usuário alterado com sucesso!");
          this.router.navigate(['']);
        }
      }
    );
  }

  private createUserFromForm(form: any): User {
    return {
      firstName: form.value["nome"],
      lastName: form.value["sobrenome"],
      email: form.value["email"],
      cpf: form.value["cpf"]
    };
  }

  private setFormWithUserData(user: JSON): void {
    this.fieldFirstName = user['firstName'];
    this.fieldLastName = user['lastName'];
    this.fieldCpf = user['cpf'];
    this.fieldEmail = user['email'];    
  }
}
