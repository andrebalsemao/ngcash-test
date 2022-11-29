import { User, UserDB } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Users";

  public toUserModel = (user: User): UserDB => {
    const userDB: UserDB = {
      id: user.getId(),
      userName: user.getUserName(),
      password: user.getPassword(),
      accountId: user.getAccountId(),
    };

    return userDB;
  };

  public findByUserName = async (
    userName: string
  ): Promise<UserDB | undefined> => {
    const result: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ userName });

    return result[0];
  };

  public createUser = async (user: User): Promise<void> => {
    const userDB = this.toUserModel(user);

    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };
}
