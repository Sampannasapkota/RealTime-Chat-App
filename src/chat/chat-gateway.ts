import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log('New User Connected..', client.id);
        client.broadcast.emit('user-joined', {
            message: `New user joined the chat:${client.id}`,
        });
    }
    handleDisconnect(client: Socket) {
        console.log('User Disconnected..', client.id);
        this.server.emit('user-left', {
            message: `user left the chat:${client.id}`,
        });
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(@MessageBody() message: string) {
        this.server.emit('message', message);

        this.server.emit('reply', 'broadcasting...');
    }
}

//socket.on()

//socket.emit()
