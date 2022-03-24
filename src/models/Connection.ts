import { ConnectionType } from '../enums';

export type Connection = {
  type: ConnectionType;
  ontypechange: () => void;
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};
