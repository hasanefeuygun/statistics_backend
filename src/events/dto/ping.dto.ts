import { IsString } from 'class-validator';

export class PingDto {
  @IsString()
  msg: string;
}
