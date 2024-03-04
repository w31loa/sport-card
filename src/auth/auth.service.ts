import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import {Response}  from 'express';

@Injectable()
export class AuthService {

    constructor(private usersService : UserService,
        private jwtService:JwtService){}


        async login(res:Response , userDto:  LoginDto){
            const user = await this.validateUser(userDto)
            const token =  this.generateToken(user)
            
            return token
        } 



        private async generateToken(user:User){
        const payload = {id: user.id, cardNumber: user.cardNumber, login: user.login, role: user.role}
        return{
            token: this.jwtService.sign(payload)
        }
        }

        private async validateUser(userDto: LoginDto){
        const user = userDto.login? await this.usersService.findOneByLogin(userDto.login)
                     : await this.usersService.findOneByCardNumber(userDto.cardNumber)

  
        const passwordEquals = userDto.password == user.password? true : false
        if(user&& passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Неверный логин или пароль'})
        }

}
