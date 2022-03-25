import { FileStorage } from './modules/fileStorage';
import { LocalStorage } from './modules/localStorage';
import { Volume } from './modules/volume';

export class KaiOS {
  static Volume = Volume;
  static LocalStorage = LocalStorage;
  static FileStorage = FileStorage;
}
