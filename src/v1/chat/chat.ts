import { UpdateMessageChatDetails } from 'src/utils/types';
import { Chat } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';

export interface IChatService {
  activeChat(videoId: string): Promise<Chat>;

  getChatMessages(videoId: string): Promise<Message[]>;

  addMessageChat(
    chatId: string,
    data: UpdateMessageChatDetails,
  ): Promise<Message[]>;

  updateMessageChat(
    chatId: string,
    messageId: string,
    data: UpdateMessageChatDetails,
  ): Promise<Message[]>;

  deleteMessageChat(chatId: string, messageId: string): Promise<Message[]>;
}
