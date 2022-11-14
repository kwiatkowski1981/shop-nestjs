import { IsDateString, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDetailsDto {
  @IsUUID()
  id?: string;

  @IsString()
  @Length(5, 100, { message: 'The detail length is wrong.' })
  name: string;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;
}
