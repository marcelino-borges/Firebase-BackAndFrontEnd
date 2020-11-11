# Firebase Project 

Project made to study Firebase as a college task. BackEnd using Firebase Functions and FrontEnd using Firebase Hosting.

## API DOCUMENTATION (PORTUGUESE)

API com CRUD para interfacear funcionalidades para cadastro e armazenamento de usuários no backend do Firebase.

### CREATE
* **Endpoint:** 
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users

* **Como usar:** Colocar dentro do [body] da requisição o JSON no seguinte formato:
```
[
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	}
]
```

* **Tipo do método:** POST
* **Retorno de sucesso:** `Usuário criado com sucesso - [Nome: Nome Usuário - CPF: 00000000000]`.
* **Retorno de falha:** `Não foi possível criar o usuário. CPF 00000000000 já cadastrado na base` ou `{Mensagem de Exception}`.

### CREATE (EM MASSA)
* **Endpoint:** 
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/mass

* **Como usar:** Colocar dentro do [body] da requisição o JSON no seguinte formato (contendo uma massa maior de dados):
```
[
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	},
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	},
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	},
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	},
	{
		"firstName": "Name",
		"lastName": "Last Name",
		"email": "mail@hotmail.com",
		"cpf": "00000000000"
	} 
	(...)
]
```

* **Tipo do método:** POST
* **Retorno de sucesso:** `Usuários criados com sucesso. {Status de cada tentativa de adicionar usuário}`.
* **Retorno de falha:** `Não foi possível criar o usuário. CPF 00000000000 já cadastrado na base` ou `{Mensagem de Exception}`.

### READ (ALL USERS)
* **Endpoint:**
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users

* **Como usar:**
	Enviar requisição vazia.

* **Tipo do método:** GET
* **Retorno com sucesso:** lista com todos os usuários. Ex.:
```
{
	"users": {
		"00000000001": {
			"lastName": "Botelho",
			"email": "botelho**gt@hotmail.com",
			"cpf": "00000000001",
			"firstName": "Marcelino"
		},
		"00000000002": {
			"email": "levouicaro@gmail.com",
			"firstName": "Icaro",
			"lastName": "Levou",
			"cpf": "00000000002"
		},
		"00000000003": {
			"firstName": "Rafael",
			"email": "rafaciano@gmail.com",
			"lastName": "Infeliciano",
			"cpf": "00000000003"
		},
		"00000000004": {
			"email": "odracir@gmail.com",
			"cpf": "00000000004",
			"firstName": "Odracir",
			"lastName": "Santos"
		},
		"00000000005": {
			"email": "luana@gmail.com",
			"lastName": "Nogueira",
			"cpf": "00000000005",
			"firstName": "Luana"
		}
	}
}
```
* **Retorno com falha:** `Não foi possível localizar os usuários` ou `{Mensagem de exception}`.

### READ (1 USUÁRIO)
* **Endpoint:**
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/num_cpf

* **Como usar:**
	Enviar requisição trocando o parâmetro “num_cpf” pelo número de CPF do usuário que deseja localizar.

* **Tipo do método:** GET
* **Retorno com sucesso:** JSON com os dados do usuário localizado ou `Não foi possível localizar o usuário. Error: {Mensagem de exception}`.

### UPDATE
* **Endpoint:**
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/num_cpf

* **Como usar:**
	Enviar requisição trocando o parâmetro “num_cpf” pelo número de CPF do usuário que deseja localizar e passar no body da requisição um JSON no formato:
	{
		"firstName": "Nome",
		"lastName": "Sobrenome",
		"email": "oemail @hotmail.com",
		"cpf": "00000000002"
	}

* **Tipo do método:** PATCH
* **Retorno com sucesso:** `Usuário alterado com sucesso`.
* **Retorno com falha:** `Não foi possível alterar o usuário. {Mensagem de exception}`.

### DELETE
* **Endpoint:**
	https://us-central1-sistemasdistribuidos-7f031.cloudfunctions.net/webApi/api/v1/users/num_cpf

* **Como usar:**
	Enviar requisição trocando o parâmetro “num_cpf” pelo número de CPF do usuário que deseja deletar.

* **Tipo do método:** DELETE
* **Retorno com sucesso:**  `Usuário deletado com sucesso: {Número do CPF}`.
* **Retorno com falha:** `Não foi possível deletar usuário. {Mensagem de exception}`.

