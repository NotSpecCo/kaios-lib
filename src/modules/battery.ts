import { CallbackFn } from '../models';
import { Navigator } from './navigator';

type Options = {
  subscribeToChanges: boolean;
};

export class Battery {
  charging: boolean = false;
  level: number = 0;
  temperature: number = 0;

  constructor(options?: Partial<Options>) {
    const opts: Options = {
      subscribeToChanges: true,
    };

    this.updateStatus();

    Navigator.navigator.battery.onlevelchange = () => {
      if (opts.subscribeToChanges) {
        this.updateStatus();
      }
      this.onLevelChange?.(Navigator.navigator.battery.level);
    };
    Navigator.navigator.battery.onchargingchange = () => {
      if (opts.subscribeToChanges) {
        this.updateStatus();
      }
      this.onChargingChange?.(Navigator.navigator.battery.charging);
    };
  }

  onLevelChange: CallbackFn<number> = null;
  onChargingChange: CallbackFn<boolean> = null;

  private updateStatus() {
    this.charging = Navigator.navigator.battery.charging;
    this.level = Navigator.navigator.battery.level;
    this.temperature = Navigator.navigator.battery.temperature;
  }
}
