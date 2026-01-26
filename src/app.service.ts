import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNumbers(): number {
    return Math.floor(Math.random() * 10 + 1); // Numbers 1 to 10 both included
  }
}
