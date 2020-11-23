import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  userForm: FormGroup;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      inputFirstName: new FormControl(''),
      inputLastName: new FormControl(''),
      inputCpf: new FormControl(''),
      inputEmail: new FormControl('')
    });
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
      user).subscribe({
        error: error => {
          this.errorMessage = error.status;
          if (this.errorMessage != 201)
            console.error('Ocorreu um erro ao criar usuário no Back End', this.errorMessage);
        }
      });
  }

  private editUserOnBackEnd(user: User) {
    var json = JSON.stringify(user);
    
    this.http.patch('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/' + user.cpf , json).subscribe({
      error: error => {
        this.errorMessage = error.status;
        if (this.errorMessage != 201)
          console.error('Ocorreu um erro ao editar usuário no Back End', this.errorMessage);
      }
    });
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
    this.userForm.setValue({ 
      inputFirstName: user['firstName'], 
      inputLastName: user['lastName'], 
      inputCpf: user['cpf'], 
      inputEmail: user['email']});
      //this.inputFirstName.setValue(user['firstName']));
    // this.inputLastName.setValue(user['lastName']);
    // this.inputCpf.setValue(user['cpf']);
    // this.inputEmail.setValue(user['email']);
  }

}
