import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../database/database.db',
      synchronize: true,
      logging: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
