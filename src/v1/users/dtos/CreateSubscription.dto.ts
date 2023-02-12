import { IsString } from 'class-validator';

export class CreateSubscriptionDto {
  channelId: string;

  @IsString()
  title: string;

  picture: string;
}
