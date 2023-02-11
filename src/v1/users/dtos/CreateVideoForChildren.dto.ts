import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoForChildrenDto {
  videoId: string;

  channelId: string;

  thumbnail: string;

  @IsString()
  title: string;

  // @IsString()
  // @IsNotEmpty()
  // type: string;
  duration: string;
}
