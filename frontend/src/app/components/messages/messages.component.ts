import { Component } from '@angular/core';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: []
})
export class MessagesComponent {

  constructor(public messageService: MessageService) { }

}
