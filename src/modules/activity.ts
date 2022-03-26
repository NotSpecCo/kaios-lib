import { MozWindow } from '../models';

type Data = {
  name: string;
  data: { [key: string]: any };
};

export class Activity<TResult = any> {
  data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  start(): Promise<TResult> {
    return new Promise((resolve, reject) => {
      const activity = new (window as MozWindow).MozActivity(this.data);

      activity.onsuccess = function () {
        resolve(this.result);
      };

      activity.onerror = function () {
        reject(this.error);
      };
    });
  }
}
