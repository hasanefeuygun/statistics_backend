import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NumbersService implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    setInterval(() => {
      const value = Math.floor(Math.random() * 10) + 1;

      this.eventEmitter.emit('numbers.tick', {
        value,
        at: Date.now(),
      });
    }, 1000); // Send random number every 1 second
  }
}
