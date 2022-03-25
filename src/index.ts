import { Battery } from './modules/battery';
import { FileStorage } from './modules/fileStorage';
import { LocalStorage } from './modules/localStorage';
import { Volume } from './modules/volume';

export class KaiOS {
  static Volume = Volume;
  static LocalStorage = LocalStorage;
  static FileStorage = FileStorage;
  static Battery = Battery;
}
