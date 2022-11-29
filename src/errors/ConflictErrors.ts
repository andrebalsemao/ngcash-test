import { BaseError } from "../errors/BaseError";

export class ConflictErrors extends BaseError {
  constructor(message: string) {
    super(message, 409);
  }
}
