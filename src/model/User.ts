export interface IUserDTO {
  userName: string;
  password: string;
}

export interface IUserLoginDTO {
  userName: string;
  password: string;
}

export interface UserDB {
  id: string;
  userName: string;
  password: string;
  accountId: string;
}

export interface UserOutputDTO {
  message: string;
  token: string;
  userName: string;
}

export class User {
  constructor(
    private id: string,
    private userName: string,
    private password: string,
    private accountId: string
  ) {}

  public getId = () => {
    return this.id;
  };
  public getUserName = () => {
    return this.userName;
  };
  public getPassword = () => {
    return this.password;
  };
  public getAccountId = () => {
    return this.accountId;
  };
}
