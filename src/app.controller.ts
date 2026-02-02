import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/live')
  getHealth(): { status: HttpStatus; message: string } {
    return this.appService.getHealth();
  }
}
