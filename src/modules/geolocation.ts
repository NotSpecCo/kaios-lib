import { Navigator } from './navigator';

type GetCurrentOptions = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

export class Geolocation {
  getCurrent(options?: GetCurrentOptions): Promise<Location> {
    return new Promise((resolve, reject) => {
      Navigator.navigator.geolocation.getCurrentPosition(
        (position: Location) => resolve(position),
        (err: GeolocationPositionError) => reject(err),
        options
      );
    });
  }
}
