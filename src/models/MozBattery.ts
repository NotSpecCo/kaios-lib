export type MozBattery = {
  charging: boolean;
  level: number;
  temperature: number;
  health: string;
  present: boolean;
  onlevelchange: (() => void) | null;
  onchargingchange: (() => void) | null;
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};
