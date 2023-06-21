import {Injectable} from "@angular/core";
import {Observable, Observer, Subject} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {map} from 'rxjs/operators';
import {WebSocketMessage} from "../interfaces/interfaces";

const WS_URL = 'ws://localhost:3000/currency-feed';

@Injectable()
export class WebsocketService {

  subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<WebSocketMessage>;

  constructor() {
    this.messages = <Subject<WebSocketMessage>>this.connect(WS_URL).pipe(
      map(
        (response: MessageEvent): WebSocketMessage => {
          // console.log(response.data)
          return JSON.parse(response.data);
        }
      )
    );
  }

  connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    // @ts-ignore
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }


}

