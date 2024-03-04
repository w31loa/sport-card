import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { throws } from 'assert';

@Injectable()
export class CategoryService {

  constructor(private readonly prismaService:PrismaService){}

  async create(createCategoryInput: CreateCategoryInput) {


    const category = await this.prismaService.category.findFirst({where: createCategoryInput })

    if(category){
      throw new HttpException('Category with this title already' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.category.create({data: createCategoryInput})
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return  await this.prismaService.category.findUnique({where: {id} });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return await this.prismaService.category.update({where:{id} , data: updateCategoryInput }) ;
  }

  async  remove(id: number) {
    return await this.prismaService.category.delete({where: {id} });
  }
}
