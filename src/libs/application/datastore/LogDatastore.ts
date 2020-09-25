import { injectable } from "inversify";

type LogType = "normal" | "error";
export interface ILog {
  value: string;
  type: LogType;
}

@injectable()
export class LogDatastore {
  private _values: ILog[] = [];

  getLog(): ILog[] {
    return this._values;
  }
  normal(value: string): void {
    this._values.push({
      value: value,
      type: "normal"
    });
  }
  error(value: string): void {
    this._values.push({
      value: value,
      type: "error"
    });
  }
  fresh(): void {
    this._values = [];
  }
}
