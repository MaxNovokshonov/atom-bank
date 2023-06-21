import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "../../../services/websocket.service";
import {WebSocketMessage} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-rate-stream',
  templateUrl: './rate-stream.component.html',
  styleUrls: ['./rate-stream.component.scss'],
  providers: [WebsocketService]
})
export class RateStreamComponent implements OnInit, OnDestroy{
  received: WebSocketMessage[] = [];

  constructor(private WebsocketService: WebsocketService) {
  }
  ngOnInit(): void {
    this.openWebsocket()
  }

  openWebsocket() {
    this.WebsocketService.messages.subscribe(message => {
      console.log(this.received)
      return this.received.unshift(message);
    });
  }

  closeWebsocket() {
    this.WebsocketService.messages.unsubscribe()
  }

  ngOnDestroy(): void {
    this.closeWebsocket()
  }


}


