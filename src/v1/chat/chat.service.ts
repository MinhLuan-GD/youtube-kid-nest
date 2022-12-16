import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMessageChatDetails } from 'src/utils/types';
import { IChatService } from './chat';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}

  activeChat(videoId: string) {
    return this.chatModel
      .findOneAndUpdate({ video_id: videoId }, {}, { upsert: true, new: true })
      .lean();
  }

  async getChatMessages(videoId: string) {
    const { messages }: Chat = await this.chatModel
      .findOne({ video_id: videoId })
      .lean();
    return messages;
  }

  async addMessageChat(chatId: string, data: UpdateMessageChatDetails) {
    const { messages }: Chat = await this.chatModel
      .findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: data } },
        { new: true },
      )
      .lean();
    return messages;
  }

  async updateMessageChat(
    chatId: string,
    messageId: string,
    data: UpdateMessageChatDetails,
  ) {
    const { name, picture, text } = data;
    const { messages }: Chat = await this.chatModel
      .findOneAndUpdate(
        { _id: chatId, 'messages._id': messageId },
        {
          'messages.$.name': name,
          'messages.$.picture': picture,
          'messages.$.text': text,
        },
        { new: true },
      )
      .lean();
    return messages;
  }

  async deleteMessageChat(chatId: string, messageId: string) {
    const { messages }: Chat = await this.chatModel
      .findOneAndUpdate(
        { _id: chatId },
        { $pull: { messages: { _id: messageId } } },
        { new: true },
      )
      .lean();
    return messages;
  }
}
