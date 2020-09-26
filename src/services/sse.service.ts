import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  /**
   * Create the events source
   * @param url
   */
  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
