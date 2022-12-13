export interface IChatService {
  activeChat(videoId: string);
  getChatMessages(videoId: string);
  addMessageChat(chatId: string, data: any);
  updateMessageChat(chatId: string, messageId: string, data: any);
  deleteMessageChat(chatId: string, messageId);
}
