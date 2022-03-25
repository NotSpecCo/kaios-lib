import { Navigator } from './navigator';

export class Volume {
  up(): Promise<void> {
    Navigator.navigator.volumeManager.requestUp();
    return Promise.resolve();
  }

  down(): Promise<void> {
    Navigator.navigator.volumeManager.requestDown();
    return Promise.resolve();
  }

  show(): Promise<void> {
    Navigator.navigator.volumeManager.requestShow();
    return Promise.resolve();
  }
}
