import {
  ItransactionDB,
  ItransactionListDB,
  Transaction,
} from "../model/Transaction";
import { BaseDatabase } from "./BaseDatabase";

export class TransactionDatabase extends BaseDatabase {
  public static TABLE_TRANSACTIONS = "Transactions";

  private transactionModelDB = (transaction: Transaction): ItransactionDB => {
    const transactionDB: ItransactionDB = {
      id: transaction.getId(),
      value: transaction.getValue(),
      debitedAccountId: transaction.getDebitedAccount(),
      creditedAccountId: transaction.getCreditedAccount(),
    };

    return transactionDB;
  };

  public findTransactionsByDate = async (
    date: Date
  ): Promise<ItransactionDB | undefined> => {
    const result: ItransactionDB[] = await BaseDatabase.connection(
      TransactionDatabase.TABLE_TRANSACTIONS
    )
      .select()
      .where({ createdAt: date });

    return result[0];
  };

  public createTransaction = async (
    transaction: Transaction
  ): Promise<void> => {
    const transactionDB = this.transactionModelDB(transaction);

    await BaseDatabase.connection(
      TransactionDatabase.TABLE_TRANSACTIONS
    ).insert(transactionDB);
  };

  public getTransactions = async () => {
    const result = await BaseDatabase.connection(
      TransactionDatabase.TABLE_TRANSACTIONS
    );

    const transactionsModel = result.map((transaction) => {
      return new Transaction(
        transaction.id,
        transaction.value,
        transaction.debitedAccountId,
        transaction.creditedAccountId,
        transaction.createdAt
      );
    });
    return transactionsModel;
  };
  public getTransactionsById = async (
    creditedAccountId: string,
    debitedAccountId: string
  ) => {
    const result = await BaseDatabase.connection(
      TransactionDatabase.TABLE_TRANSACTIONS
    )
      .where({ debitedAccountId })
      .orWhere({ creditedAccountId });
    const transactionsModelInById = result.map((transaction: any) => {
      return new Transaction(
        transaction.id,
        transaction.value,
        transaction.debitedAccountId,
        transaction.creditedAccountId,
        transaction.createdAt
      );
    });
    return transactionsModelInById;
  };
}
