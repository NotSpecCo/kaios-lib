import { AlarmData } from '../models';
import { Navigator } from './navigator';

export class Alarm {
  add(newAlarm: Omit<AlarmData, 'id'>): Promise<AlarmData> {
    return new Promise((resolve, reject) => {
      const request = Navigator.navigator.mozAlarms.add(
        newAlarm.date,
        newAlarm.respectTimezone ? 'honorTimezone' : 'ignoreTimezone',
        newAlarm.data
      );

      request.onsuccess = function () {
        resolve({
          id: this.result,
          date: newAlarm.date,
          respectTimezone: newAlarm.respectTimezone,
          data: newAlarm.data,
        });
      };
      request.onerror = function () {
        reject(this.error);
      };
    });
  }

  remove(id: number): Promise<void> {
    return new Promise((resolve) => {
      Navigator.navigator.mozAlarms.remove(id);
      resolve();
    });
  }

  async removeAll(): Promise<void> {
    const alarms = await this.getAll();
    for (const alarm of alarms) {
      await this.remove(alarm.id);
    }
  }

  getAll(): Promise<AlarmData[]> {
    return new Promise((resolve, reject) => {
      const request = Navigator.navigator.mozAlarms.getAll();

      request.onsuccess = function () {
        resolve(this.result);
      };
      request.onerror = function () {
        reject(this.error);
      };
    });
  }

  subscribe(success: (data: AlarmData) => void): () => void {
    Navigator.navigator.mozSetMessageHandler('alarm', (alarm: any) => success(alarm));
    const unsubscribe = () => Navigator.navigator.mozSetMessageHandler('alarm', null);

    return unsubscribe;
  }

  unsubscribe(): void {
    Navigator.navigator.mozSetMessageHandler('alarm', null);
  }
}
