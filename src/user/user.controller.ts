import { Body, Controller, Patch, UploadedFile, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import {Request} from 'express'
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { IUserInToken } from 'src/auth/auth.types';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    
    @UseGuards(RolesGuard)
    @Roles('USER')
    @Patch('photo')
    @UseInterceptors(FileInterceptor('image'))
    async updateUserPhoto(@Req() req:Request, @UploadedFile()image){
        const user =  req['user'] as IUserInToken

        return await this.userService.setUserPhoto(image,user)
        
    }
}
