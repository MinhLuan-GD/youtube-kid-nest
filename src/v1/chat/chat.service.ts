import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const chat = await this.chatModel.findOne({ video_id: videoId }).lean();
    return chat.messages;
  }

  async addMessageChat(chatId: string, data: any) {
    const chat = await this.chatModel
      .findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: data } },
        { new: true },
      )
      .lean();
    return chat.messages;
  }

  async updateMessageChat(chatId: string, messageId: string, data: any) {
    const { name, picture, text } = data;
    const chat = await this.chatModel.findOneAndUpdate(
      { _id: chatId, 'messages._id': messageId },
      {
        'messages.$.name': name,
        'messages.$.picture': picture,
        'messages.$.text': text,
      },
      { new: true },
    );
    return chat.messages;
  }

  async deleteMessageChat(chatId: string, messageId: any) {
    const chat = await this.chatModel.findOneAndUpdate(
      { _id: chatId },
      { $pull: { messages: { _id: messageId } } },
      { new: true },
    );
    return chat.messages;
  }
}
