import { Test, TestingModule } from '@nestjs/testing';
import { ProductListController } from './product-list.controller';
import { ProductListService } from './product-list.service';

describe('ProductListController', () => {
  let controller: ProductListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductListController],
      providers: [ProductListService],
    }).compile();

    controller = module.get<ProductListController>(ProductListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
