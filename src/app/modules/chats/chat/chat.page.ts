import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { io } from 'socket.io-client';
import { ChatsService } from 'src/app/services/chats.service';
import { UsertoolsService } from 'src/app/services/usertools.service';

const socket = io("http://localhost:3001", { transports: ['websocket'] });

interface messages{
  id: number;
  idChat: number;
  sender: number;
  message: string;
}

interface messageRes{
  ok: boolean;
  messages: messages[];
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  usuarioSeleccionado:any;

  messages: messages[] = [];
  messajeText = '';

  chatId = Number(localStorage.getItem('chatId'));
  sender = Number(localStorage.getItem('id'));
  receiver = Number(localStorage.getItem('id2'));

  @ViewChild(IonContent, { static: true }) content!: IonContent;

  constructor(
    private _chatService: ChatsService,
    private _userTools: UsertoolsService,
    private router: Router
  ) { }

  ngOnInit() {
    socket.on('new-message', (data) => {
      console.log('new message', data);
      this.messages = data;
    })
    this.usuarioSeleccionado = this._userTools.getUsuario();
    this.bringMessages(this.chatId);
  }

  bringMessages(chatId: any){
    socket.on('join', chatId);
    this._chatService.findMessages(this.chatId).subscribe(
      (res:messageRes) => {
      this.messages = res.messages;
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 1);
    })
  }

  sendMessage(){
    const message = {
      idchat: this.chatId,
      sender: this.sender,
      message: this.messajeText
    }
    this._chatService.sendMessage(message).subscribe(
      (res) => {
        console.log(res);
        socket.emit('new-message', message);
        this.bringMessages(this.chatId);
        this.messajeText = '';
      })

  }

  goBack() {
    localStorage.removeItem('id2');
    localStorage.removeItem('chatId');
    localStorage.removeItem('usuario');
  }


}
