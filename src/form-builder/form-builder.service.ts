import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FORM_REPOSITORY } from '../database/database.constants';
import { FormRepository } from '../database/repositories/form.repository';

@Injectable()
export class FormBuilderService {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: FormRepository,
  ) {}

  async getAllForms() {
    return await this.formRepository.findAll();
  }

  async getFormByID(id: string) {
    try {
      return await this.formRepository.findById(id);
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to get form: ${id}`);
    }
  }

  async saveNewForm(form: any) {
    try {
      const id = uuidv4();
      await this.formRepository.create({ ...form, id });
      return { message: 'Form created successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save form');
    }
  }

  async updateForm(id: string, form: any) {
    try {
      await this.formRepository.update(id, form);
      return { message: 'Form updated successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to update form: ${id}`);
    }
  }
}
