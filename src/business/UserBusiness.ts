import { UserDatabase } from "../dataBase/UserDatabase";
import { ConflictErrors } from "../errors/ConflictErrors";
import { MissingFields } from "../errors/MissingFields";
import { RequestError } from "../errors/RequestError";
import { TypeFieldsValue } from "../errors/TypeFieldsValue";
import { IUserDTO, IUserLoginDTO, User, UserOutputDTO } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashManager } from "../services/HashManager";
import {
  AuthenticationPayload,
  Authenticator,
} from "../services/Authenticator";
import { AccountDatabase } from "../dataBase/AccountsDatabase";

class UserBussines {
  public signup = async (input: IUserDTO): Promise<UserOutputDTO> => {
    const { userName, password } = input;
    if (!userName || !password) {
      throw new MissingFields();
    }
    if (typeof userName !== "string") {
      throw new TypeFieldsValue(
        "Parâmetro inválido. O campo userName deve ser uma string"
      );
    }
    if (typeof password !== "string") {
      throw new TypeFieldsValue(
        "Parâmetro inválido. O campo password deve ser uma string"
      );
    }

    if (userName.length < 3) {
      throw new RequestError(
        "O campo userName deve possuir ao menos 3 caracteres"
      );
    }
    if (password.length < 8) {
      throw new RequestError(
        "O campo password deve possuir ao menos 8 caracteres"
      );
    }
    if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$/)) {
      throw new RequestError(
        "O campo password deve possuir ao menos 8 caracteres, uma letra maiuscula e um número"
      );
    }

    const userDatabase = new UserDatabase();
    const accountDatabase = new AccountDatabase();

    const isUserNameExists = await userDatabase.findByUserName(userName);
    if (isUserNameExists) {
      throw new ConflictErrors("Usuário já cadastrado!");
    }
    //gerando ID do usuário
    const id = new IdGenerator().generateId();

    //gerando ID a partir da Account
    const accountId = userName;

    const hashPassword = await new HashManager().hash(password);
    await accountDatabase.createAccount(accountId);

    const user = new User(id, userName, hashPassword, accountId);

    await userDatabase.createUser(user);

    const payload: AuthenticationPayload = {
      id: user.getId(),
      userName: user.getUserName(),
    };

    const token = new Authenticator().generateToken(payload);
    

    const response: UserOutputDTO = {
      message: `Usuário ${user.getUserName()} cadastrado com sucesso`,
      token,
      userName,
    };
    return response;
  };

  public login = async (input: IUserLoginDTO) => {
    const { userName, password } = input;

    if (!userName || !password) {
      throw new MissingFields();
    }
    if (typeof userName !== "string") {
      throw new TypeFieldsValue(
        "Parâmetro inválido. O campo userName deve ser uma string"
      );
    }
    if (typeof password !== "string") {
      throw new TypeFieldsValue(
        "Parâmetro inválido. O campo password deve ser uma string"
      );
    }
    if (userName.length < 3) {
      throw new RequestError(
        "O campo userName deve possuir ao menos 3 caracteres"
      );
    }
    if (password.length < 8) {
      throw new RequestError(
        "O campo password deve possuir ao menos 8 caracteres"
      );
    }
    if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$/)) {
      throw new RequestError(
        "O campo password deve possuir ao menos 8 caracteres, uma letra maiuscula e um número"
      );
    }

    const userDatabase = new UserDatabase();

    const userDB = await userDatabase.findByUserName(userName);
    if (!userDB) {
      throw new ConflictErrors(
        "Usuário não localizado, verifique as informações!"
      );
    }

    const user = new User(
      userDB.id,
      userDB.userName,
      userDB.password,
      userDB.accountId
    );

    const isPasswordCOrrect = await new HashManager().compare(
      password,
      user.getPassword()
    );
    if (!isPasswordCOrrect) {
      throw new ConflictErrors("Senha incorreta, tente novamente");
    }

    const payload: AuthenticationPayload = {
      id: user.getId(),
      userName: user.getUserName(),
    };

    const token = new Authenticator().generateToken(payload);

    const response: UserOutputDTO = {
      message: `Usuário logado com sucesso`,
      token,
      userName,
    };
    return response;
  };
}

export default UserBussines;
