import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinDate,
} from 'class-validator';
//===============================================
export class addCouponDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  discount_percentage: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date())
  valid_until: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
//===============================================
export class updateCouponDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  discount_percentage: number;

  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date())
  valid_until: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
