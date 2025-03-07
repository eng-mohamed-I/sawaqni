import { IsNotEmpty, IsString } from 'class-validator';
//=====================================================
export class addWishListDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
//=====================================================
