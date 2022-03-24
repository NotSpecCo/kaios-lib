import { StorageName } from '../enums/StorageName';
import { Battery } from './Battery';
import { Connection } from './Connection';
import { DomApplication } from './DomApplication';
import { Request } from './Request';

export type MozNavigator = Navigator & {
  mozApps: {
    getSelf: () => Request<DomApplication>;
  };
  battery: Battery;
  connection: Connection;
  getDeviceStorage: (name: StorageName) => {
    storageName: string;
    get: (filePath: string) => Request<File>;
    addNamed: (file: File | Blob, filePath: string) => Request<File>;
    appendNamed: (file: File | Blob, filePath: string) => Request<File>;
    delete: (filePath: string) => Request<void>;
    enumerate: any;
  };
  volumeManager: {
    requestUp: () => void;
    requestDown: () => void;
    requestShow: () => void;
  };
};
