import { IsString } from 'class-validator';

export class ModifyChildrenForChildrenDto {
  name: string;

  @IsString()
  picture: string;
}
