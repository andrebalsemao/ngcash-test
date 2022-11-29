import UserBussines from "../../src/business/UserBusiness";
import { UserDatabaseMock } from "../mocks/services/UserDatabaseMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { HashManagerMock } from "../mocks/services/HashManagerMock";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IUserLoginDTO } from "../../src/model/User";

describe("Testando o login do usuário na UserBusines", () => {
  const userBusiness = new UserBussines(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test("Caso de sucesso", async () => {
    const input: IUserLoginDTO = {
      userName: "daniel",
      password: "Bananinha123@",
    };
    const result = await userBusiness.login(input);
    expect(result.message).toEqual("Usuário logado com sucesso");
    expect(result.token).toEqual("token-daniel");
  });
});
