type LogType = "normal" | "error";
interface ILog {
  value: string;
  type: LogType;
}

export class LogDatastore {
  public static values: ILog[] = [];

  static getLog(): ILog[] {
    return LogDatastore.values;
  }
  static normal(value: string): void {
    LogDatastore.values.push({
      value: value,
      type: "normal"
    });
  }
  static error(value: string): void {
    LogDatastore.values.push({
      value: value,
      type: "error"
    });
  }
  static fresh(): void {
    LogDatastore.values = [];
  }
}
