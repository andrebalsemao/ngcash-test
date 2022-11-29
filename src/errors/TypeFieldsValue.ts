import { BaseError } from "./BaseError";

export class TypeFieldsValue extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}
