export type Battery = {
  charging: boolean;
  level: number;
  temperature: number;
  onlevelchange: () => void;
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};
