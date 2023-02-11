import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoHistoryDto {
  videoId: string;

  channelId: string;

  thumbnail: string;

  title: string;

  duration: string;
}
