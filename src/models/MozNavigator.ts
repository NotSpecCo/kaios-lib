import { StorageName } from '../enums/StorageName';
import { Connection } from './Connection';
import { DomApplication } from './DomApplication';
import { MozBattery } from './MozBattery';
import { MozDeviceStorage } from './MozDeviceStorage';
import { Request } from './Request';

export type MozNavigator = Navigator & {
  mozApps: {
    getSelf: () => Request<DomApplication>;
  };
  battery: MozBattery;
  connection: Connection;
  getDeviceStorage: (name: StorageName) => MozDeviceStorage;
  volumeManager: {
    requestUp: () => void;
    requestDown: () => void;
    requestShow: () => void;
  };
  geolocation: any;
};
