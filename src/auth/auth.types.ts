import { Field, ObjectType } from "@nestjs/graphql";


interface ILoginResponse{
    
}


@ObjectType()
export class LoginResponse {
    @Field(()=> String)
    token:string
}


export interface IUserInToken{
    id:number
    cardNumber: string
    login: string
    role: string
    
}