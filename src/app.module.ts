import { Module } from '@nestjs/common';

import { EventsModule } from './events/events.module';
import { NumbersModule } from './numbers/number.module';

@Module({
  imports: [NumbersModule, EventsModule],
})
export class AppModule {}
