import { AccountDatabase } from "../dataBase/AccountsDatabase";
import { Authenticator } from "../services/Authenticator";
import { AccountDB } from "../model/Accounts";

class AccountBussines {
  public balance = async (input: any) => {
    const { token } = input;
    const userToken = new Authenticator().getTokenPayload(token);

    const accountDatabase = new AccountDatabase();
    const balance = userToken?.userName;

    const a: AccountDB = await accountDatabase.getAccount(balance);
    return a;
  };
}

export default AccountBussines;
