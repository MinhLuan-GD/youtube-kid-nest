import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IChatService } from './chat';
import { UpdateMessageChatDto } from './dtos/UpdateMessageChat.dto';

@Controller({ version: '1', path: Routes.CHAT })
export class ChatController {
  constructor(
    @Inject(Services.CHAT) private readonly chatService: IChatService,
  ) {}

  @Post()
  activeChat(@Body() body: { videoId: string }) {
    return this.chatService.activeChat(body.videoId);
  }

  @Get(':videoId')
  getChatMessages(@Param('videoId') videoId: string) {
    return this.chatService.getChatMessages(videoId);
  }

  @Post(':chatId/messages')
  addMessageChat(
    @Param('chatId') chatId: string,
    @Body() body: UpdateMessageChatDto,
  ) {
    return this.chatService.addMessageChat(chatId, body);
  }

  @Patch(':chatId/messages/:messageId')
  updateMessageChat(@Body() body: UpdateMessageChatDto, @Param() par: any) {
    return this.chatService.updateMessageChat(par.chatId, par.messageId, body);
  }

  @Delete(':chatId/messages/:messageId')
  deleteMessageChat(@Param() par: any) {
    return this.chatService.deleteMessageChat(par.chatId, par.messageId);
  }
}
