import { IsString } from 'class-validator';

export class CreateChildrenDto {
  @IsString()
  name: string;

  year: string;

  month: string;

  content_settings: string;

  picture: string;
}
