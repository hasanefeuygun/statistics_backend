import { NumbersModule } from 'src/numbers/numbers.module';
import { EventsGateway } from './events.gateway';
import { Module } from '@nestjs/common';

@Module({
  imports: [NumbersModule],
  providers: [EventsGateway],
})
export class EventsModule {}
