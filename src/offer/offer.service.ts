import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferService {

  constructor(private readonly prismaService:PrismaService){}


  async create(createOfferInput: CreateOfferInput) {
    const title = createOfferInput.title
    const organizationId = createOfferInput.organizationId
    const offer = await this.prismaService.offer.findFirst({where: {title} })
    const organization = await this.prismaService.organization.findUnique({where: {id:organizationId} })

    if(offer){
      throw new HttpException('Offer with this title already' ,HttpStatus.BAD_REQUEST )
    }
    if(!organization){
      throw new HttpException('This organization does not exist' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.offer.create({data: createOfferInput})
  }

  async findAll() {
    return await this.prismaService.offer.findMany();
  }

  async findOne(id: number) {

    const offer = await this.prismaService.offer.findUnique({where: {id} })

    if(!offer){
      throw new HttpException('Offer with this ID does not exist' ,HttpStatus.BAD_REQUEST )
    }

    return offer;
  }

  async update(id: number, updateOfferInput: UpdateOfferInput) {

    const offer = await this.prismaService.offer.findUnique({where: {id} })

    if(!offer){
      throw new HttpException('Offer with this ID does not exist' ,HttpStatus.BAD_REQUEST )
    }

    return await this.prismaService.offer.update({where: {id} , data:updateOfferInput });
  }

  async remove(id: number) {
    return await this.prismaService.offer.delete({where: {id} });
  }
}
