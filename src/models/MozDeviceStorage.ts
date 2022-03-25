import { Request } from './Request';

export type MozDeviceStorage = {
  storageName: string;
  get: (filePath: string) => Request<File>;
  addNamed: (file: File | Blob, filePath: string) => Request<File>;
  appendNamed: (file: File | Blob, filePath: string) => Request<File>;
  delete: (filePath: string) => Request<void>;
  enumerate: any;
};
