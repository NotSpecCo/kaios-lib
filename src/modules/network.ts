import { NetworkStatus } from '../models';
import { Navigator } from './navigator';

export class Network {
  private subCallback: ((status: NetworkStatus) => void) | null;

  constructor() {
    this.subCallback = null;
  }

  current(): Promise<NetworkStatus> {
    return Promise.resolve({
      online: Navigator.navigator.onLine,
      type: Navigator.navigator.connection.type,
    });
  }

  subscribe(callback: (status: NetworkStatus) => void): void {
    if (this.subCallback) {
      this.unsubscribe();
    }

    this.subCallback = callback;

    window.addEventListener('online', this.handleUpdate);
    window.addEventListener('offline', this.handleUpdate);
    Navigator.navigator.connection.addEventListener('change', this.handleUpdate);
  }

  unsubscribe(): void {
    window.removeEventListener('online', this.handleUpdate);
    window.removeEventListener('offline', this.handleUpdate);
    Navigator.navigator.connection.removeEventListener('change', this.handleUpdate);

    this.subCallback = null;
  }

  private handleUpdate() {
    this.subCallback?.({
      online: Navigator.navigator.onLine,
      type: Navigator.navigator.connection.type,
    });
  }
}
