export interface IAccountDTO {
  id: string;
  balance: number;
}

export interface AccountDB {
  id: string;
  balance: number;
}

export class Account {
  constructor(private id: string, private balance: number) {}

  public getId = () => {
    return this.id;
  };
  public getBalance = () => {
    return this.balance;
  };
}
