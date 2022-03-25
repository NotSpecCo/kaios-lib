import { StorageName } from '../enums/StorageName';
import { Battery } from './Battery';
import { Connection } from './Connection';
import { DomApplication } from './DomApplication';
import { MozDeviceStorage } from './MozDeviceStorage';
import { Request } from './Request';

export type MozNavigator = Navigator & {
  mozApps: {
    getSelf: () => Request<DomApplication>;
  };
  battery: Battery;
  connection: Connection;
  getDeviceStorage: (name: StorageName) => MozDeviceStorage;
  volumeManager: {
    requestUp: () => void;
    requestDown: () => void;
    requestShow: () => void;
  };
};
