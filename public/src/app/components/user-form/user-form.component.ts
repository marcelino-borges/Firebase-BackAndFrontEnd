import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    
    
  }

  createUser() {
    var json;
    //json = Pega os dados do form e joga para o json
    //this.http.post('https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users', json-com-dados-no-formato-esperado, header);
    //testa primeiro o post sem setar os headers
    //headers: ("content-type", "application/json")
  }

}
