import { Navigator } from './navigator';

export class Volume {
  up(): Promise<void> {
    Navigator.navigator.volumeManager.requestUp();
    return;
  }

  down(): Promise<void> {
    Navigator.navigator.volumeManager.requestDown();
    return;
  }

  show(): Promise<void> {
    Navigator.navigator.volumeManager.requestShow();
    return;
  }
}
