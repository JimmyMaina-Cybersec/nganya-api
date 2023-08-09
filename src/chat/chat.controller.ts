import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dto/create-chat.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get()
  getHello(
    @Body() chat: CreateChatDto,
    @CurrentUser() user: JwtPayload,
  ): Object {
    return this.chatService.sendMessage(chat, user);
  }
}
