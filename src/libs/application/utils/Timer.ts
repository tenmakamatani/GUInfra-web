export class Timer {
  static async wait(sec: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, sec * 1000);
    });
  }
}
