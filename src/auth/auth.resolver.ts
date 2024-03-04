import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginDto, LoginInput } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from './auth.types';
import {Response}  from 'express';


@Resolver()
export class AuthResolver {

    constructor(private readonly authService:AuthService){}

    @Mutation(()=> LoginResponse)
    login(@Args('loginInput') dto:LoginInput, @Context() context: { res: Response }){
        return this.authService.login(context.res , dto)
    }

}
