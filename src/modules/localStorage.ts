export class LocalStorage {
  setItem(key: string, data: any): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  getItem<T>(key: string): T | null {
    return JSON.parse(window.localStorage.getItem(key) as string);
  }
}
