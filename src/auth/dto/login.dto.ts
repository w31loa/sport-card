import { Field, InputType } from "@nestjs/graphql"

export class LoginDto{
    cardNumber?:string
    login?:string
    password:string
}


@InputType()
export class LoginInput{
    @Field({nullable: true})
    cardNumber?:string
    
    @Field({nullable: true})
    login?:string

    @Field({nullable: false})
    password:string

}