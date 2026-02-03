import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { NumbersModule } from './numbers/numbers.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [EventEmitterModule.forRoot(), NumbersModule, EventsModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
