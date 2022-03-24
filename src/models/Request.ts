export type Request<T> = {
  error?: Error;
  result: T;
  onsuccess: () => void;
  onerror: () => void;
};
