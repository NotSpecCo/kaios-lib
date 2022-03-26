export class PermissionError extends Error {
  name: string = 'PermissionError';

  constructor(message?: string) {
    super(message);

    if (message) {
      this.message = message;
    }
  }
}
