import { Test, TestingModule } from '@nestjs/testing';
import { ProductListService } from './product-list.service';

describe('ProductListService', () => {
  let service: ProductListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListService],
    }).compile();

    service = module.get<ProductListService>(ProductListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
