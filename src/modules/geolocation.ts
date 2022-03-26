import { Navigator } from './navigator';

type Options = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

export class Geolocation {
  subscriptionId: number | null;

  constructor() {
    this.subscriptionId = null;
  }

  current(options?: Options): Promise<Location> {
    return new Promise((resolve, reject) => {
      Navigator.navigator.geolocation.getCurrentPosition(
        (position: Location) => resolve(position),
        (err: GeolocationPositionError) => reject(err),
        options
      );
    });
  }

  subscribe(
    success: (data: Location) => void,
    error?: (err: Error) => void,
    options?: Options
  ): void {
    if (this.subscriptionId !== null) {
      this.unsubscribe();
    }
    this.subscriptionId = Navigator.navigator.geolocation.watchPosition(success, error, options);
  }

  unsubscribe(): void {
    Navigator.navigator.geolocation.clearWatch(this.subscriptionId);
  }
}
