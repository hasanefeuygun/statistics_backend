import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Module({
  providers: [AppService],
  exports: [AppService],
})
export class NumbersModule {}
