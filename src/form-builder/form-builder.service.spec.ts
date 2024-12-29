import { Test, TestingModule } from '@nestjs/testing';
import { FormBuilderService } from './form-builder.service';

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormBuilderService],
    }).compile();

    service = module.get<FormBuilderService>(FormBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
