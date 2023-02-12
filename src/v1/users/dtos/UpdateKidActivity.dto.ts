import { IsString } from 'class-validator';

class UpdateActivityDto {
  content: string;

  videoId: string;

  channelId: string;

  new_name: string;

  new_picture: string;
}

export class UpdateKidActivityDto {
  name: string;

  @IsString()
  picture: string;

  type: string;

  activity: UpdateActivityDto;
}
