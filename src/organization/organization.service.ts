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
    const organization = await this.prismaService.category.findFirst({where: {title} })

    if(organization){
      throw new HttpException('Organization with this title already' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.organization.create({data: CreateOrganizationInput})
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
