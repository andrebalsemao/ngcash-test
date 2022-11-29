import { BaseError } from "./BaseError";

export class MissingFields extends BaseError {
  constructor() {
    super("Um dos campos não foi preenchido", 404);
  }
}
