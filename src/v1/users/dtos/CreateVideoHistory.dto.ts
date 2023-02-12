import { IsString } from 'class-validator';

export class CreateVideoHistoryDto {
  videoId: string;

  channelId: string;

  thumbnail: string;

  @IsString()
  title: string;

  duration: string;
}
