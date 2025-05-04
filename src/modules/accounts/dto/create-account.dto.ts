import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ACCOUNT_TYPES } from 'src/constants/app.constants';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsEnum(ACCOUNT_TYPES)
  @IsNotEmpty()
  type: ACCOUNT_TYPES;
}
