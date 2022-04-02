import jsQR from 'jsqr';
import { Navigator } from './navigator';

export class QRCode {
  private element: HTMLElement;
  private interval: NodeJS.Timer | null = null;
  private status: 'idle' | 'scanning' | 'cancelled' = 'idle';
  private handler: any;

  constructor() {
    this.element = this.createRootElement();
  }

  async readAsText(): Promise<string | null> {
    if (this.status !== 'idle') {
      throw new Error('Already scanning for qr code');
    }

    this.status = 'scanning';

    this.showViewer();
    await this.startVideo();
    const result = await this.checkForQRCode();
    this.hideViewer();

    this.status = 'idle';

    return result;
  }

  private handleKeyPress(ev: KeyboardEvent) {
    if (ev.key !== 'SoftRight' && ev.key !== 'Backspace') {
      return;
    }

    ev.stopImmediatePropagation();
    ev.stopPropagation();
    ev.preventDefault();

    this.status = 'cancelled';
  }

  private createRootElement(): HTMLElement {
    const root = document.createElement('div');
    root.id = 'kosl__scanner';
    root.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9999999;
        background: #000;
        color: rgba(255, 255, 255, .88);
        padding: 0px;
        margin: 0px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;

    const header = document.createElement('header');
    header.style.cssText = `
        font-weight: bold;
        text-align: center;
        padding-bottom: 5px;
    `;
    header.textContent = 'Scan a QR Code';

    const video = document.createElement('video');
    video.style.cssText = `
        flex: 1;
        min-height: 0;
    `;

    const footer = document.createElement('footer');
    footer.style.cssText = `
        font-weight: bold;
        text-align: right;
        padding: 5px 5px 0 5px;
    `;
    footer.textContent = 'Cancel';

    root.appendChild(header);
    root.appendChild(video);
    root.appendChild(footer);

    return root;
  }

  private showViewer() {
    document.body.appendChild(this.element);
    this.handler = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.handler, { capture: true });
  }

  private hideViewer() {
    document.removeEventListener('keydown', this.handler, { capture: true });
    clearInterval(this.interval!);
    this.element?.remove();
  }

  private startVideo(): Promise<void> {
    return new Promise((resolve, reject) => {
      Navigator.navigator.mozGetUserMedia(
        {
          audio: false,
          video: {
            width: 240,
            height: 240,
          },
        },
        (stream: any) => {
          const video = document.querySelector('#kosl__scanner > video') as HTMLVideoElement | null;
          if (!video) return reject('Unable to find video element');

          video.srcObject = stream;

          video.onloadedmetadata = () => {
            video.play();
            resolve();
          };
        },
        reject
      );
    });
  }

  private checkForQRCode(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const video = document.querySelector('#kosl__scanner > video') as HTMLVideoElement | null;
      if (!video) return reject('Unable to find video element');

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      this.interval = setInterval(() => {
        if (this.status === 'cancelled') {
          return resolve(null);
        }
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const code = jsQR(imageData.data, video.videoWidth, video.videoHeight);
        if (code) {
          resolve(code.data);
        }
      }, 1000);
    });
  }
}
