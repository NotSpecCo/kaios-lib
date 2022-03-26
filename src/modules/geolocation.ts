import { Navigator } from './navigator';

type Options = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

export class Geolocation {
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
  ): () => void {
    const id = Navigator.navigator.geolocation.watchPosition(success, error, options);
    const unsubscribe = () => Navigator.navigator.geolocation.clearWatch(id);
    return unsubscribe;
  }
}
