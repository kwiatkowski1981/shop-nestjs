import { IsDateString, IsString, Length } from 'class-validator';

export class CreateProductDescriptionDto {
  @IsString()
  @Length(5, 1000, { message: 'The description length is wrong' })
  description: string;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;
}
