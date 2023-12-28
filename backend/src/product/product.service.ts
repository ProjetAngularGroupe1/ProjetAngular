import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOneByName(name: string): Promise<Product | null> {
        const result = await this.productRepository.findOneBy({ name: name });
        return result[0];
    }
}
