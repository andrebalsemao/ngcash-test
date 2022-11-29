import { AccountDatabase } from "../dataBase/AccountsDatabase";
import { TransactionDatabase } from "../dataBase/TransactionDatabase";
import { RequestError } from "../errors/RequestError";
import { Account } from "../model/Accounts";
import {
  ItransactionDTO,
  Transaction,
  TransactionOutputDTO,
} from "../model/Transaction";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";

class TransactionBusiness {
  public create = async (
    input: ItransactionDTO
  ): Promise<TransactionOutputDTO> => {
    const { token, value, creditedAccount } = input;

    if (!token) {
      throw new RequestError("Token inválido ou inexistente");
    }

    const payload = new Authenticator().getTokenPayload(token);
    if (!payload) {
      throw new RequestError("Usuário não localizado");
    }

    const accountDatabase = new AccountDatabase();
    const cashOut = payload?.userName;

    const a = await accountDatabase.getAccount(cashOut);
    const debitedAccount = new Account(a.id, a.balance);
    if (debitedAccount.getBalance() < value) {
      throw new Error("Saldo insuficiente para realizar a transação!");
    }
    if (debitedAccount.getId() === creditedAccount) {
      throw new Error(
        "Impossível realizar a transação! Selecione um usuário diferente de você mesmo!"
      );
    }

    const b = await accountDatabase.getAccount(creditedAccount);
    if (!b) {
      throw new Error(
        "Impossível realizar a transação! Conta de destino inexistente ou incorreta!"
      );
    }
    const crediteddAccount = new Account(b.id, b.balance);

    const calculateCashOut = debitedAccount.getBalance() - Number(value);
    const calculateCashIn = crediteddAccount.getBalance() + Number(value);
    await accountDatabase.updateCashOut(
      calculateCashOut,
      debitedAccount.getId()
    );
    await accountDatabase.updateCashIn(
      calculateCashIn,
      crediteddAccount.getId()
    );

    const transactionDatabase = new TransactionDatabase();

    const id = new IdGenerator().generateId();
    const transaction = new Transaction(
      id,
      value,
      debitedAccount.getId(),
      creditedAccount
    );

    await transactionDatabase.createTransaction(transaction);
    const response: TransactionOutputDTO = {
      message: "Transação cadastrada com sucesso",
      transaction,
    };
    return response;
  };

  public getTransactionsIn = async (input: any) => {
    const { token } = input;
    const userToken = new Authenticator().getTokenPayload(token);

    const transactionDatabase = new TransactionDatabase();
    const debitedAccountId = userToken?.userName;
    const creditedAccountId = userToken?.userName;

    const transactionDB = await transactionDatabase.getTransactionsById(
      debitedAccountId,
      creditedAccountId
    );

    return transactionDB;
  };
}

export default TransactionBusiness;
