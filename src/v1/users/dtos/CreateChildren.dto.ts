import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChildrenDto {
  name: string;

  year: string;

  month: string;

  content_settings: string;

  picture: string;
}
