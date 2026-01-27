import { IsNumber, ValidateNested } from 'class-validator';
import { PingDto } from './ping.dto';
import { Type } from 'class-transformer';

export class PongDto {
  @ValidateNested()
  @Type(() => PingDto)
  received: PingDto;
  @IsNumber()
  number: number;
  @IsNumber()
  at: number;
}
