import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoForChildrenDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  channelId: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  title: string;

  // @IsString()
  // @IsNotEmpty()
  // type: string;
  @IsString()
  duration: string;
}
