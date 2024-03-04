import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { ForbiddenError } from '@nestjs/apollo';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { getJwtConfig } from '../auth.config';

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private readonly reflector: Reflector,
                private readonly jwtService:JwtService,
                private readonly configService:ConfigService){}

    canActivate(ctx:ExecutionContext):boolean{

        const context = GqlExecutionContext.create(ctx)
        const req = context.getContext().req

        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY , [ctx.getHandler() , ctx.getClass()])

            if(!requiredRoles){
                return true
            }
   
   

            const authHeader = this.extractTokenFromCtx(req)
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
    

            const user = this.jwtService.verify(token)
            

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:'Пользователь не авторизован'})
          }
 
            req["user"]=user

            return requiredRoles.includes(user.role)
        }

        catch(err){
            throw new ForbiddenError('No access')
        }
  

    }

    private extractTokenFromCtx(req): string | undefined {
        return String(req.rawHeaders.filter(el => el.startsWith('Bearer'))) 
      }

}