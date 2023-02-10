import { IsString } from 'class-validator';

class CreateActivityDto {
  content: string;

  videoId: string;

  channelId: string;

  new_name: string;

  new_picture: string;
}

export class CreateKidActivityDto {
  childrenId: string;

  name: string;

  picture: string;

  type: string;

  activity: CreateActivityDto;
}
