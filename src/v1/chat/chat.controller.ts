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

@Controller({ version: '1', path: Routes.CHAT })
export class ChatController {
  constructor(
    @Inject(Services.CHAT) private readonly chatService: IChatService,
  ) {}

  @Post()
  activeChat(@Body() body) {
    return this.chatService.activeChat(body.videoId);
  }

  @Get(':videoId')
  getChatMessages(@Param('videoId') videoId) {
    return this.chatService.getChatMessages(videoId);
  }

  @Post(':chatId/messages')
  addMessageChat(@Param('chatId') chatId, @Body() body) {
    return this.chatService.addMessageChat(chatId, body);
  }

  @Patch(':chatId/messages/:messageId')
  updateMessageChat(@Body() body, @Param() par) {
    return this.chatService.updateMessageChat(par.chatId, par.messageId, body);
  }

  @Delete(':chatId/messages/:messageId')
  deleteMessageChat(@Param() par) {
    return this.chatService.deleteMessageChat(par.chatId, par.messageId);
  }
}
