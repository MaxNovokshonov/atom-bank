import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { WebSocketMessage } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-rate-stream',
  templateUrl: './rate-stream.component.html',
  styleUrls: ['./rate-stream.component.scss'],
  providers: [WebsocketService],
})
export class RateStreamComponent implements OnInit, OnDestroy {
  receivedMessages: WebSocketMessage[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.openWebsocket();
  }

  openWebsocket() {
    this.websocketService.messages$.subscribe((message) => {
      return this.receivedMessages.unshift(message);
    });
  }

  ngOnDestroy(): void {
    this.websocketService.closeWebsocket();
  }
}
