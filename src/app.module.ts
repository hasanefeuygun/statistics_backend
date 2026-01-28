import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { NumbersModule } from './numbers/numbers.module';

@Module({
  imports: [EventEmitterModule.forRoot(), NumbersModule, EventsModule],
})
export class AppModule {}
