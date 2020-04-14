export class API {
  static count = async (num: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const randInt = Math.random() * 10 - 5;
      if (randInt > 3) {
        reject();
      }
      resolve(num++);
    });
  };
}
