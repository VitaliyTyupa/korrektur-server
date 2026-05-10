import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TEXT_REPOSITORY } from '../database/database.constants';
import { TextRepository } from '../database/repositories/text.repository';

@Injectable()
export class TextService {
  constructor(
    @Inject(TEXT_REPOSITORY)
    private readonly textRepository: TextRepository,
  ) {}

  async getTexts() {
    return await this.textRepository.findAll();
  }

  async getTextById(id) {
    try {
      return await this.textRepository.findById(id);
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to get form: ${id}`);
    }
  }

  async createText(data) {
    try {
      const id = uuidv4();
      await this.textRepository.create({ ...data, id });
      return { message: 'Text created successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save text');
    }
  }

  async deleteTextById(id: string) {
    try {
      await this.textRepository.deleteById(id);
      return { message: 'Text deleted successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to delete text: ${id}`);
    }
  }
}
