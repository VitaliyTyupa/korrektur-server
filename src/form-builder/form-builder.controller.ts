import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FormBuilderService } from './form-builder.service';
import { Public } from '../decorators/public.decorator';

@Controller('form-builder')
export class FormBuilderController {
  constructor(private readonly formBuilderService: FormBuilderService) {}

  @Public()
  @Get('/all-forms')
  async getForms() {
    try {
      return await this.formBuilderService.getAllForms();
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }

  @Public()
  @Get('/form/:id')
  async getFormByID(@Param('id') id: string) {
    try {
      return await this.formBuilderService.getFormByID(id);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }

  @Public()
  @Post('/form')
  async saveForm(@Body() data: { form: any; id: string | null }) {
    try {
      if (!data.id) {
        await this.formBuilderService.saveNewForm(data);
      } else {
        await this.formBuilderService.updateForm(data.id, data);
      }
      return { message: 'Form created successfully' };
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }
}
