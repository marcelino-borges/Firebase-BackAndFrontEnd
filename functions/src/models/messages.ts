export class Message {
    //Success
    static successUserCreated: string = `Usuário criado com sucesso`;
    static sucessUserUpdated: string = `Usuário alterado com sucesso`;
    static sucessUserFound: string = `Usuário localizado com sucesso`;
    static sucessAllUsersFound: string = `Usuários localizados com sucesso`;
    static sucessUserDeleted: string = `Usuário deletado com sucesso`;

    //Error
    static errorUserNotCreated: string = `Não foi possível criar o usuário`;
    static errorUserNotUpdated: string = `Não foi possível alterar o usuário`;
    static errorUserNotFound: string = `Não foi possível localizar o usuário`;
    static errorAllUsersNotFound: string = `Não foi possível localizar os usuários`;
    static errorUserDeleted: string = `Não foi possível deletar usuário`;
}