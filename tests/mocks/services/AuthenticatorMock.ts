import { AuthenticationPayload } from "../../../src/services/Authenticator";

export class AuthenticatorMock {
  generateToken(payload: AuthenticationPayload): string {
    switch (payload.id) {
      case "487d1bd1-f719-4866-b548-7789a5bfe2f2":
        return "token-daniel";
      default:
        return "token-mock";
    }
  }

  getTokenPayload(token: string): AuthenticationPayload | null | undefined {
    switch (token) {
      case "token-mock":
        return {
          id: "id-mock",
          userName: "userName-mock",
        };
      case "token-daniel":
        return {
          id: "487d1bd1-f719-4866-b548-7789a5bfe2f2",
          userName: "daniel",
        };
      default:
        return null;
    }
  }
}
