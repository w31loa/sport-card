import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './model/user.model';
import { STATUS_CODES } from 'http';


@Injectable()
export class UserService {

  constructor(private readonly prisma:PrismaService){}

  async create(createUserInput: CreateUserInput) {

    const newUser = await this.prisma.user.create({data:createUserInput})

    return newUser 
  }

  async findAll():Promise<User[]> {
    return this.prisma.user.findMany()
  }


  
  
  async findOneById(id: number) {

    const user = await this.prisma.user.findUnique({where:{id} })

    if(!user){
      throw new HttpException(`User with login = ${id} does not exist !`, HttpStatus.NOT_FOUND )
    }

    return user ;
  }
  async findOneByLogin(login: string) {

    const user = await this.prisma.user.findUnique({where:{login} })

    if(!user){
      throw new HttpException(`User with login = ${login} does not exist !`, HttpStatus.NOT_FOUND )
    }

    return user ;
  }
  async findOneByCardNumber(cardNumber: string) {

    const user = await this.prisma.user.findUnique({where:{cardNumber} })

    if(!user){
      throw new HttpException(`User with card number = ${cardNumber} does not exist !`, HttpStatus.NOT_FOUND )
    }

    return user ;
  }

  async update(updateUserInput: UpdateUserInput) {
    const id = +updateUserInput.id
    updateUserInput.id = id

    const user = await this.prisma.user.findUnique({where: {id} })

    if(!user){
      throw new HttpException(`User with id = ${id} does not exist !`, HttpStatus.NOT_FOUND )
    }
    
    
    return  await this.prisma.user.update({where: {id},data:updateUserInput })

  }

  async remove(id: number) {

    const user = await this.prisma.user.findUnique({where: {id} })

    if(!user){
      throw new HttpException(`User with id = ${id} does not exist !`, HttpStatus.NOT_FOUND )
    }

    return await this.prisma.user.delete({where: {id} });
  }
} 
