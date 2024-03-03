import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@InputType('UserInput')
export class CreateUserInput {

  @Field()
  cardNumber!: string

  @Field()
  login!: string



  @Field()
  password!: string

  @Field()
  name!: string

  @Field()
  surname!: string
  @Field()
  dob!: Date
  @Field({nullable: true})
  photoPath?: string
  @Field()
  role!: $Enums.Role


  // cardNumber: string
  // login: string
  // password: string
  // name: string
  // surname: string
  // dob: Date | string
  // photoPath?: string | null
  // role?: $Enums.Role
}





