import { Manifest } from './Manifest';

export type DomApplication = {
  manifest: Manifest;
  updateManifest: null;
  manifestURL: string;
  origin: string;
  installOrigin: string;
  oldVersion: string;
  installTime: number;
  removable: boolean;
  enabled: boolean;
  role: string;

  launch: () => void;
};
