import { EventsGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { NumbersModule } from 'src/numbers/number.module';
@Module({
  imports: [NumbersModule],
  providers: [EventsGateway],
})
export class EventsModule {}
