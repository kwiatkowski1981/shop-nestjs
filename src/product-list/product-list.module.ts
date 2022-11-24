import { forwardRef, Module } from '@nestjs/common';
import { ProductListService } from './product-list.service';
import { ProductListController } from './product-list.controller';
// import { ProductModule } from '../product/product.module';

@Module({
  // imports: [forwardRef(() => ProductModule)],
  controllers: [ProductListController],
  providers: [ProductListService],
  exports: [ProductListService],
})
export class ProductListModule {}
