import { IsString } from 'class-validator';

export class ModifyChildrenForParentDto {
  name: string;

  @IsString()
  picture: string;

  year: string;

  month: string;
}
