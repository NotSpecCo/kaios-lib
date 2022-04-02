import { Activity } from './modules/activity';
import { Alarm } from './modules/alarm';
import { App } from './modules/app';
import { Battery } from './modules/battery';
import { FileStorage } from './modules/fileStorage';
import { Geolocation } from './modules/geolocation';
import { LocalStorage } from './modules/localStorage';
import { Network } from './modules/network';
import { QRCode } from './modules/qrCode';
import { Volume } from './modules/volume';

export * from './modules/activity';
export * from './modules/alarm';
export * from './modules/app';
export * from './modules/battery';
export * from './modules/fileStorage';
export * from './modules/geolocation';
export * from './modules/localStorage';
export * from './modules/network';
export * from './modules/qrCode';
export * from './modules/volume';

export default class KaiOS {
  static Activity = Activity;
  static Alarm = Alarm;
  static App = App;
  static Battery = Battery;
  static FileStorage = FileStorage;
  static Geolocation = Geolocation;
  static LocalStorage = LocalStorage;
  static Network = Network;
  static QRCode = QRCode;
  static Volume = Volume;
}
