import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NumbersService implements OnModuleDestroy {
  private statsInterval: NodeJS.Timeout | null = null;
  private subscriberCount = 0;

  private STATS_INTERVAL_MS = 5000;

  constructor(private eventEmitter: EventEmitter2) {}

  startForClient() {
    this.subscriberCount++;

    if (this.statsInterval) return;

    this.statsInterval = setInterval(() => {
      const value = Math.floor(Math.random() * 10) + 1;
      this.eventEmitter.emit('numbers.tick', {
        value,
        at: Date.now(),
      });
    }, this.STATS_INTERVAL_MS);
  }

  stopForClient() {
    this.subscriberCount = Math.max(0, this.subscriberCount - 1);

    if (this.subscriberCount > 0) return;

    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
  }

  getSubscriberCount() {
    return this.subscriberCount;
  }

  private clearStatsInterval() {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
  }

  onModuleDestroy() {
    this.clearStatsInterval();
    this.subscriberCount = 0;
  }
}
