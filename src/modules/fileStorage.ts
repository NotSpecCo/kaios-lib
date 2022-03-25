import { StorageName } from '../enums';
import { FileSearchResult, MozDeviceStorage } from '../models';
import { Navigator } from './navigator';

export class FileStorage {
  name: string;
  storage: MozDeviceStorage;

  constructor(storageName: StorageName) {
    this.name = this.getActualStorageName(storageName);
    this.storage = Navigator.navigator.getDeviceStorage(storageName);
  }

  get(filePath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const request = this.storage.get(filePath);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  getAsFileUrl(filePathAndName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = this.storage.get(filePathAndName);
      request.onsuccess = () => resolve(URL.createObjectURL(request.result));
      request.onerror = () => reject(request.error);
    });
  }

  addNamed(filePathAndName: string, file: Blob | File): Promise<File> {
    return new Promise((resolve, reject) => {
      const request = this.storage.addNamed(file, filePathAndName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  appendNamed(filePathAndName: string, file: Blob | File): Promise<File> {
    return new Promise((resolve, reject) => {
      const request = this.storage.appendNamed(file, filePathAndName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  delete(filePathAndName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.storage.delete(filePathAndName);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  search(regex: RegExp): Promise<FileSearchResult[]> {
    return new Promise((resolve, reject) => {
      const files: FileSearchResult[] = [];
      const cursor = this.storage.enumerate();

      cursor.onsuccess = function (): void {
        if (!this.result) {
          resolve(files);
          return;
        }

        const match = this.result.name.match(regex);
        if (match) {
          files.push({
            name: this.result.name,
            size: this.result.size,
            type: this.result.type,
            lastModified: this.result.lastModified,
            lastModifiedDate: this.result.lastModifiedDate,
          });
        }

        this.continue();
      };

      cursor.onerror = function (): void {
        reject(this.error);
      };
    });
  }

  getActualStorageName(storageName: StorageName): string {
    return Navigator.navigator.getDeviceStorage(storageName)?.storageName;
  }
}
