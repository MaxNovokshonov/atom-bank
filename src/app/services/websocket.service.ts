import {Injectable} from "@angular/core";
import {Observable, Observer, Subject} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {map} from 'rxjs/operators';
import {WebSocketMessage} from "../interfaces/interfaces";

// const WS_URL = 'ws://localhost:3000/currency-feed';
const WS_URL = 'ws://coin-maxnovokshonov.amvera.io/currency-feed'

@Injectable()
export class WebsocketService {

  subject: Subject<MessageEvent>;
  public messages: Observable<WebSocketMessage>;
  websocket = new WebSocket(WS_URL);

  constructor() {
    this.messages = this.connect(WS_URL).pipe(
      map(
        (response: MessageEvent): WebSocketMessage => {
          return JSON.parse(response.data);
        }
      )
    );
  }

  closeWebsocket() {
    this.websocket.close()
  }

  connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.openWebsocket(url);
    }
    return this.subject;
  }


  openWebsocket(url: string): AnonymousSubject<MessageEvent> {
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      this.websocket.onmessage = obs.next.bind(obs);
      this.websocket.onerror = obs.error.bind(obs);
      this.websocket.onclose = obs.complete.bind(obs);
      return this.websocket.close.bind(this.websocket);
    });
    let observer = {
      error: (err: any) => {},
      complete: () => {},
      next: (data: Object) => {}
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }


}

