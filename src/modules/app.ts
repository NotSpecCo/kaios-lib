import { Manifest } from '../models';
import { Navigator } from './navigator';

export class App {
  getManifest(): Promise<Manifest> {
    return new Promise((resolve, reject) => {
      const request = Navigator.navigator.mozApps.getSelf();
      request.onsuccess = () => resolve(request.result.manifest);
      request.onerror = () => reject(request.error);
    });
  }
}
