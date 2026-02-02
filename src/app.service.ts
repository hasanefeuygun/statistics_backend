import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: HttpStatus; message: string } {
    return {
      status: 200,
      message: 'ok',
    };
  }
}
