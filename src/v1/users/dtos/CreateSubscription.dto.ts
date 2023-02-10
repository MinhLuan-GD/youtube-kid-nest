import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  channelId: string;

  title: string;

  picture: string;
}
