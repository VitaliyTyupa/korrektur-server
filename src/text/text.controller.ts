import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private readonly service: TextService) {}

  @Get('/texts')
  getTexts() {
    return this.service.getTexts();
  }

  @Get('/text/:id')
  getText(@Param('id') id: string) {
    return this.service.getTextById(id);
  }

  @Post('/text')
  createText(@Body() data) {
    return this.service.createText(data);
  }

  @Delete('/text/:id')
  deleteText(@Param('id') id: string) {
    return this.service.deleteTextById(id);
  }
}
