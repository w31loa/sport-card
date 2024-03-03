import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { GraphQLEnumType } from 'graphql';

@ObjectType()
export class User {
  @Field(()=> ID , {nullable:false})
  id!: number

  @Field(()=> String  , {nullable: false })
  cardNumber!: string

  @Field(()=> String, {nullable: false})
  login!: string

  @Field(()=> String, {nullable: false})
  password!: string

  @Field(()=> String, {nullable: false})
  name!: string

  @Field(()=> String, {nullable: false})
  surname!: string

  @Field(()=> Date , {nullable: false})
  dob!: Date

  @Field(()=> String||null, {nullable: false})
  photoPath?: string

  @Field(()=> String, {nullable: false})
  role!: $Enums.Role


}





