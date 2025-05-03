import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ACCOUNT_TYPES } from 'src/constants/app.constants';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ACCOUNT_TYPES)
  type: ACCOUNT_TYPES;
}
