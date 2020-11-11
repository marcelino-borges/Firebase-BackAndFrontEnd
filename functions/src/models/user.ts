export class User {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;

    constructor(firstName: string, lastName: string, email: string, cpf: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.cpf = cpf;
    }
}