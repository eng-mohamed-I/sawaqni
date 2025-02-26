import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
//=======================================
// Register
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

// Login
export class loginDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
