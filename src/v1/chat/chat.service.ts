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

  getChatMessages(videoId: string) {
    return this.chatModel.findOne({ video_id: videoId }).lean();
  }

  addMessageChat(chatId: string, data: any) {
    return this.chatModel
      .findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: data } },
        { new: true },
      )
      .lean();
  }

  updateMessageChat(chatId: string, messageId: string, data: any) {
    const { name, picture, text } = data;
    this.chatModel.findOneAndUpdate(
      { _id: chatId, 'messages._id': messageId },
      {
        'messages.$.name': name,
        'messages.$.picture': picture,
        'messages.$.text': text,
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  deleteMessageChat(chatId: string, messageId: any) {
    this.chatModel.findOneAndUpdate(
      { _id: chatId },
      { $pull: { messages: { _id: messageId } } },
      {},
      () => ({}),
    );
    return 'ok';
  }
}
