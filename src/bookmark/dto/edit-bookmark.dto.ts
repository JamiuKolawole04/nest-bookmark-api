import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @Length(6, 200)
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @Length(6, 200)
  description?: string;

  @IsString()
  @Length(6, 220)
  @IsNotEmpty()
  @IsOptional()
  link?: string;
}
