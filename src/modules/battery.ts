import { BatteryStatus } from '../models';
import { Navigator } from './navigator';

export class Battery {
  current(): Promise<BatteryStatus> {
    return new Promise((resolve) => {
      const batt = Navigator.navigator.battery;
      resolve(this.getStatus());
    });
  }

  subscribe(success: (data: BatteryStatus) => void): () => void {
    Navigator.navigator.battery.onlevelchange = () => success(this.getStatus());
    Navigator.navigator.battery.onchargingchange = () => success(this.getStatus());

    const unsubscribe = () => {
      Navigator.navigator.battery.onlevelchange = null;
      Navigator.navigator.battery.onchargingchange = null;
    };

    return unsubscribe;
  }

  private getStatus(): BatteryStatus {
    return {
      charging: Navigator.navigator.battery.charging,
      level: Navigator.navigator.battery.level,
      temperature: Navigator.navigator.battery.temperature,
      health: Navigator.navigator.battery.health,
      present: Navigator.navigator.battery.present,
    };
  }
}
