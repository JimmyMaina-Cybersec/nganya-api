import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}
  sendMessage(chat: CreateChatDto, user: JwtPayload) {
    const newChat = new this.chatModel({
      message: chat.message,
      file: chat.file,
      to: chat.to,
      from: user._id,
      sacco: user.sacco,
    });
    return newChat.save();
  }
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  userMessages(user: JwtPayload) {
    try {
      return this.chatModel
        .find({ sacco: user.sacco })
        .or([{ to: user._id }, { from: user._id }]);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
