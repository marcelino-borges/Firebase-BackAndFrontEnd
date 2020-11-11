import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { User } from './models/user';
import { Message } from './models/messages';

//SETTINGS
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//
// VARIABLES ------------------------------------------------------------------
//

const usersCollection = 'users';

//
// METHODS ---------------------------------------------------------------------
//

//CREATE
app.post(`/${usersCollection}`,  async (req, res) => {
    try {
        const newUser: User = {
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            email: req.body['email'],
            cpf: req.body['cpf']
        }       

        let cpfFound = false;
        
        await firebaseHelper.firestore.getDocument(db, usersCollection, newUser.cpf.toString()).then(doc => {
            if(doc['cpf'] !== undefined)
                cpfFound = true;
        });

        if(cpfFound == false) {
            await firebaseHelper.firestore.createDocumentWithID(db, usersCollection, newUser.cpf.toString(), newUser)
                .then(doc => res.status(201).send(Message.successUserCreated + ` - [Nome: ${newUser.firstName} ${newUser.lastName} - CPF: ${newUser.cpf}]`));                
        } else {
            res.status(401).send(`${Message.errorUserNotCreated}. CPF ${newUser.cpf} já cadastrado na base`);
        }
    } catch (error) {
        res.status(400).send(Message.errorUserNotCreated + `. ${error}`);
    }
});

app.post(`/${usersCollection}/mass`,  async (req, res) => {
    let result = "";
    try {
        let mass = req.body;
        
        for (let index = 0; index < mass.length; index++) {
            let cpfFound = false;

            const userElement = mass[index];
            
            const newUser: User = {
                firstName: userElement['firstName'],
                lastName: userElement['lastName'],
                email: userElement['email'],
                cpf: userElement['cpf']
            }

            await firebaseHelper.firestore.getDocument(db, usersCollection, newUser.cpf).then(doc => {
                if(doc['cpf'] !== undefined)
                    cpfFound = true;
            });

            if(cpfFound == false) {
                await firebaseHelper.firestore.createDocumentWithID(db, usersCollection, newUser.cpf, newUser).then(a => {                    
                    result += `Usuário com CPF ${newUser.cpf} adicionado com sucesso.\n`;
                }).catch(error => {
                    result += `Não foi possível adicionar usuário com CPF ${newUser.cpf}. Erro: ${error}`;
                });
            } else {                
                result += `Não foi possível adicionar usuário com CPF ${newUser.cpf}. Já existe na base.\n`;
            }
        }
        res.status(201).send(Message.sucessAllUsersCreated + `\n\n${result}`);
    } catch (error) {
        res.status(400).send(Message.errorAllUsersNotCreated + `. ${error}\n\n${result}`);
    }
});

//READ
//All users
app.get(`/${usersCollection}`, (req, res) => {
    firebaseHelper.firestore
    .backup(db, usersCollection)
    .then(data => { 
        if(data !== null)
            res.status(200).send(data)
        else {
            res.status(400).send(Message.errorAllUsersNotFound)
        }
    }).catch(error => res.status(400).send(Message.errorAllUsersNotFound + `. Erro: ${error}`));
});

//1 user
app.get(`/${usersCollection}/:userCpf`, (req, res) => {
    firebaseHelper.firestore
    .getDocument(db, usersCollection, req.params.userCpf)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(Message.errorUserNotFound + `. Erro: ${error}`));

});

//UPDATE
app.patch(`/${usersCollection}/:userCpf`, async (req, res) => {
    try {
        const updatedDoc = await firebaseHelper.firestore.updateDocument(db, usersCollection, req.params.userCpf, req.body);
        res.status(204).send(Message.sucessUserUpdated + `. Id do documento: ${updatedDoc.id}`);
    } catch (error) {
        res.status(400).send(Message.errorUserNotUpdated + `. ${error}`);
    }
});

//DELETE
app.delete(`/${usersCollection}/:userCpf`, async (req, res) => {
    try {
        const deletedContact = await firebaseHelper.firestore.deleteDocument(db, usersCollection, req.params.userCpf);
        res.status(204).send(Message.sucessUserDeleted + `. ${deletedContact}`);
    } catch (error) {
        res.status(400).send(Message.errorUserDeleted + `. ${error}`);
    }
});

export const webApi = functions.https.onRequest(main);