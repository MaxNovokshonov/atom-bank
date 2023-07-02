import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { WebSocketMessage } from '../interfaces/interfaces';
import { mainUrl } from '../../environments/environment';

@Injectable()
export class WebsocketService {
  subject$: Subject<MessageEvent>;

  public messages$: Observable<WebSocketMessage>;

  websocket = new WebSocket(mainUrl.WS_URL);

  constructor() {
    this.messages$ = this.connect().pipe(
      map((response: MessageEvent): WebSocketMessage => {
        return JSON.parse(response.data);
      }),
    );
  }

  closeWebsocket() {
    this.websocket.close();
  }

  connect(): Subject<MessageEvent> {
    if (!this.subject$) {
      this.subject$ = this.openWebsocket();
    }
    return this.subject$;
  }

  openWebsocket(): AnonymousSubject<MessageEvent> {
    const observable = new Observable((obs: Observer<MessageEvent>) => {
      this.websocket.onmessage = obs.next.bind(obs);
      this.websocket.onerror = obs.error.bind(obs);
      this.websocket.onclose = obs.complete.bind(obs);
      return this.websocket.close.bind(this.websocket);
    });
    const observer = {
      error: () => {},
      complete: () => {},
      next: () => {},
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
