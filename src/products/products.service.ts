import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  //
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto); //Aqui se crea
      await this.productRepository.save(product); // Aqui se guarda
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el producto -');
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error con GET all');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
