import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationService {

  constructor(private readonly prismaService:PrismaService){}

  async create(createOrganizationInput: CreateOrganizationInput) {
    const title = createOrganizationInput.title
    const categoryId = createOrganizationInput.categoryId
    const organization = await this.prismaService.organization.findFirst({where: {title} })
    const category = await this.prismaService.category.findUnique({where: {id:categoryId} })

    if(organization){
      throw new HttpException('Organization with this title already' ,HttpStatus.BAD_REQUEST )
    }
    if(!category){
      throw new HttpException('This category does not exist' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.organization.create({data: createOrganizationInput})
  }

  async findAll() {
    return  await this.prismaService.organization.findMany();
  }

  async findOne(id: number) {

    const organization = await this.prismaService.organization.findUnique({where:{id} })

    if(!organization){
      throw new HttpException('Organization with this ID does not exist' ,HttpStatus.BAD_REQUEST )
    }


    return  organization;
  }

  async update(id: number, updateOrganizationInput: UpdateOrganizationInput) {

    const organization = await this.prismaService.organization.findUnique({where:{id} })

    if(!organization){
      throw new HttpException('Organization with this ID does not exist' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.organization.update({where:{id} , data: updateOrganizationInput});
  }

  async remove(id: number) {
   

    return await this.prismaService.organization.delete({where:{id} })
  }
}
