export class LogDatastore {
  public static executionLog: string[] = [];

  static fresh(): void {
    LogDatastore.executionLog = [];
  }
}
