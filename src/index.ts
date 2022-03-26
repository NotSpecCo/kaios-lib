import { App } from './modules/app';
import { Battery } from './modules/battery';
import { FileStorage } from './modules/fileStorage';
import { Geolocation } from './modules/geolocation';
import { LocalStorage } from './modules/localStorage';
import { Volume } from './modules/volume';

export * from './modules/app';
export * from './modules/battery';
export * from './modules/fileStorage';
export * from './modules/geolocation';
export * from './modules/localStorage';
export * from './modules/volume';

export default class KaiOS {
  static App = App;
  static Battery = Battery;
  static FileStorage = FileStorage;
  static Geolocation = Geolocation;
  static LocalStorage = LocalStorage;
  static Volume = Volume;
}
