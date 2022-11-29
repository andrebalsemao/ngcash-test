export interface ItransactionDTO {
  token: string;
  value: number;
  creditedAccount: string;
}
export interface TransactionOutputDTO {
  message: string;
  transaction: Transaction;
}

export interface ItransactionDB {
  id: string;
  value: number;
  debitedAccountId: string;
  creditedAccountId: string;
}

export interface ItransactionListDB {
  id: string;
  value: number;
  debitedAccountId: string;
  creditedAccountId: string;
  createdAt: string;
}

export interface TransactionsListOutputDTO {
  transactions: ItransactionListDB;
}

export interface ItransactionListDTO {
  token: string;
  id: string;
}

export class Transaction {
  constructor(
    private id: string,
    private value: number,
    private debitedAccountId: string,
    private creditedAccountId: string,
    private createdAt?: string
  ) {}

  public getId = () => {
    return this.id;
  };
  public getValue = () => {
    return this.value;
  };

  public getDebitedAccount = () => {
    return this.debitedAccountId;
  };
  public getCreditedAccount = () => {
    return this.creditedAccountId;
  };
  public getCreatedAt = () => {
    return this.createdAt;
  };
}
