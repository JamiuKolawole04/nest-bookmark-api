import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
export class createBookmarkDto {
  @IsString()
  @Length(6, 40)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @Length(6, 40)
  description?: string;

  @IsString()
  @Length(6, 220)
  @IsNotEmpty()
  link: string;
}
