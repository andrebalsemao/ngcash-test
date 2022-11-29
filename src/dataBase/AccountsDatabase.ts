import { Account, AccountDB } from "../model/Accounts";
import { BaseDatabase } from "./BaseDatabase";

export class AccountDatabase extends BaseDatabase {
  public static TABLE_ACCOUNTS = "Accounts";

  //   private toAccountModel = (account: AccountDB): AccountDB => {
  //     const account: AccountDB = {
  //       id: string
  //     };

  //     return accountDB;
  //   };

  public createAccount = async (accountId: string): Promise<void> => {
    // const accountDB = this.toAccountModel(account);

    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNTS).insert({
      id: accountId,
    });
  };

  public getAccount = async (userName: string): Promise<AccountDB> => {
    const result = await BaseDatabase.connection(
      AccountDatabase.TABLE_ACCOUNTS
    ).where({
      id: userName,
    });
    return result[0];
  };

  // public getBalance = async (userName: string): Promise<AccountDB> => {
  //   const result = await BaseDatabase.connection(
  //     AccountDatabase.TABLE_ACCOUNTS
  //   ).where({
  //     id: userName,
  //   });
  //   return result;
  // };

  public updateCashOut = async (calculateCashOut: number, id: string) => {
    const result = await BaseDatabase.connection.raw(
      `UPDATE ${AccountDatabase.TABLE_ACCOUNTS} SET balance = ${calculateCashOut} WHERE id = "${id}"`
    );
  };

  public updateCashIn = async (calculateCashIn: number, id: string) => {
    const result = await BaseDatabase.connection.raw(
      `UPDATE ${AccountDatabase.TABLE_ACCOUNTS} SET balance = ${calculateCashIn} WHERE id = "${id}"`
    );
  };
}
