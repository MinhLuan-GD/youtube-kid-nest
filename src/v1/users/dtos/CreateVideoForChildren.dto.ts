import { IsString } from 'class-validator';

export class CreateVideoForChildrenDto {
  videoId: string;

  channelId: string;

  thumbnail: string;

  @IsString()
  title: string;

  duration: string;
}
