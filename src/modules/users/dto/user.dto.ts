import {
  IsBoolean,
  IsEmail,
  isEnum,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/core/guards/Role/enum/role.enum';
//==========================================================
// Add User
export class addUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsNotEmpty()
  role: Role;

  @IsBoolean()
  @IsNotEmpty()
  is_verified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
//==========================================================
// Update User
export class updateUserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  full_name: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsNotEmpty()
  role: Role;

  @IsBoolean()
  @IsNotEmpty()
  is_verified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
