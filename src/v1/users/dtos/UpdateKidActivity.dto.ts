import { IsString } from 'class-validator';

class UpdateActivityDto {
  @IsString()
  content: string;

  @IsString()
  videoId: string;

  @IsString()
  channelId: string;

  @IsString()
  new_name: string;

  @IsString()
  new_picture: string;
}

export class UpdateKidActivityDto {
  @IsString()
  name: string;

  @IsString()
  picture: string;

  @IsString()
  type: string;

  activity: UpdateActivityDto;
}
