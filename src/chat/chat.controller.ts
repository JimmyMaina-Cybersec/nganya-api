import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dto/create-chat.dto';
import { OldCurrentUser } from 'src/common/decorators/current-user.decorator';
import { OldJwtPayload } from 'src/types/jwt-payload';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get()
  getHello(
    @Body() chat: CreateChatDto,
    @OldCurrentUser() user: OldJwtPayload,
  ): Object {
    return this.chatService.sendMessage(chat, user);
  }
}
