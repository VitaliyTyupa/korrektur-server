import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  checkConnection(): string {
    return JSON.stringify('Ok');
  }
}
