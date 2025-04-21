import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private readonly service: TextService) {}

  @Get('/all')
  getTexts() {
    return this.service.getTexts();
  }

  @Get('/:id')
  getText(@Param('id') id: string) {
    return this.service.getTextById(id);
  }

  @Post('/')
  createText(@Body() data) {
    return this.service.createText(data);
  }

  @Delete('/:id')
  deleteText(@Param('id') id: string) {
    return this.service.deleteTextById(id);
  }
}
