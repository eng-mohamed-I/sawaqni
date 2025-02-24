import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MATCHES,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class registerDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;
}
