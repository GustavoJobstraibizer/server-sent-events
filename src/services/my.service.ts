import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(private _ngZone: NgZone, private _sseService: SseService) {}

  /**
   * Returns the event source stream
   *
   * @param url
   */
  getServerSentEvent(url: string) {
    return new Observable((observer) => {
      const eventSource = this._sseService.getEventSource(
        `http://localhost:3000${url}`
      );

      // message
      eventSource.onmessage = (event) => {
        this._ngZone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this._ngZone.run(() => {
          observer.error(error);
          eventSource.close();
        });
      };

      // custom listener 'notification'
      eventSource.addEventListener('notification', (event) => {
        this._ngZone.run(() => {
          observer.next(event);
        });
      });
    });
  }
}
