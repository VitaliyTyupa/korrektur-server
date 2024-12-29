import { Test, TestingModule } from '@nestjs/testing';
import { FormBuilderController } from './form-builder.controller';

describe('FormBuilderController', () => {
  let controller: FormBuilderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormBuilderController],
    }).compile();

    controller = module.get<FormBuilderController>(FormBuilderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
