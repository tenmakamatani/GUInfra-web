import { v4 as uuidv4 } from "uuid";

export abstract class Id {
  // Generate automatically
  readonly value: string;

  constructor(_value?: string) {
    this.value = _value ? _value : uuidv4();
  }

  isEqualTo(other: Id) {
    return this.value === other.value;
  }
}
