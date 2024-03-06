import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './model/user.model';
import { IUserInToken } from 'src/auth/auth.types';
import { FilesService } from 'src/files/files.service';
import { $Enums } from '@prisma/client';


@Injectable()
export class UserService implements OnModuleInit{

  constructor(private readonly prisma:PrismaService,
              private readonly fileService:FilesService){}


  async create(createUserInput: CreateUserInput) {
    
    let cardNumber =  this.generateCardNumber(16)

    const userExist = this.prisma.user.findFirst({where: {cardNumber} })
  
    if(userExist){
      cardNumber = this.generateCardNumber(16)
    }


    const data = {
      cardNumber: cardNumber,
      login: createUserInput.login,
      password: createUserInput.password,
      name: createUserInput.name,
      surname: createUserInput.surname,
      dob: createUserInput.dob,
      role: createUserInput.role
    }

   

    return  await this.prisma.user.create({data}) 
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



  async setUserPhoto(file, user:IUserInToken){

      const login = user.login

      const filename = await this.fileService.createFile(file , login)


      const userToUpdate = await this.prisma.user.findUnique({where: {login} })

      userToUpdate.photoPath = filename

      return await this.prisma.user.update({where:{login}, data: userToUpdate})

  }


   private generateCardNumber(length:number){
    let cardNum = []

    for(let i = 0 ; i<length ; i++){

      if(i%4 == 0 && i>0){
        cardNum.push(' ')
      }

      cardNum.push(Math.floor(Math.random() * 10))
    }

      return cardNum.join('')

  
  }


  async onModuleInit() {
    const admin = await this.prisma.user.findFirst({where: {
      role: "ADMIN"
    } })

    if(!admin){

      const date = new Date(Date.now())
    
      const data = {
        cardNumber: "1111 1111 1111 1111",
        login: "admin",
        password: "root",
        name: "admin",
        surname: "admin",
        dob: date.toISOString(),
        role:"ADMIN" as $Enums.Role

      }

      const newAdmin = await this.prisma.user.create({data})
      console.log(newAdmin)
    }

    console.log(admin)

  }

} 
