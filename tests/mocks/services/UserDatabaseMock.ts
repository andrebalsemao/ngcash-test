import { BaseDatabase } from "../../../src/dataBase/BaseDatabase";
import { User, UserDB } from "../../../src/model/User";

export class UserDatabaseMock extends BaseDatabase {
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
    switch (userName) {
      case "daniel":
        return {
          id: "487d1bd1-f719-4866-b548-7789a5bfe2f2",
          userName: "daniel",
          password:
            "$2a$12$2JRDDmbbCY2i0hTYq.WQjuCslvZ6e7DLuZX9YMx1EJhwawgp3MlXa",
          accountId: "daniel",
        };
      default:
        return undefined;
    }
  };

  public createUser = async (user: User): Promise<void> => {};
}
