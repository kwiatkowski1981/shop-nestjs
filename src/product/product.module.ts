import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BasketModule } from '../basket/basket.module';
// import { ProductListModule } from '../product-list/product-list.module';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    // forwardRef(() => ProductListModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
