export class API {
  static count = async (num: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randInt = Math.random();
        if (randInt > 0.5) {
          reject();
        }
        num++;
        resolve(num);
      }, 1000);
    });
  };
}
