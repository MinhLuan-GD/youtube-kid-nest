import { UpdateMessageChatDetails } from 'src/utils/types';

export interface IChatService {
  activeChat(videoId: string): any;

  getChatMessages(videoId: string): any;

  addMessageChat(chatId: string, data: UpdateMessageChatDetails): any;

  updateMessageChat(
    chatId: string,
    messageId: string,
    data: UpdateMessageChatDetails,
  ): any;

  deleteMessageChat(chatId: string, messageId: string): any;
}
