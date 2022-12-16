import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMessageChatDetails } from 'src/utils/types';
import { IChatService } from './chat';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}

  async activeChat(videoId: string): Promise<Chat> {
    return this.chatModel
      .findOneAndUpdate({ video_id: videoId }, {}, { upsert: true, new: true })
      .lean();
  }

  async getChatMessages(videoId: string): Promise<Message[]> {
    const { messages }: Chat = await this.chatModel
      .findOne({ video_id: videoId })
      .lean();
    return messages;
  }

  async addMessageChat(
    chatId: string,
    data: UpdateMessageChatDetails,
  ): Promise<Message[]> {
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
  ): Promise<Message[]> {
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

  async deleteMessageChat(
    chatId: string,
    messageId: string,
  ): Promise<Message[]> {
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
