import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(()=> ID , {nullable:false})
  id!: number

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

  @Field(()=> String, {nullable: false})
  photoPath!: string

  @Field(()=> Role, {nullable: false, defaultValue: "USER"})
  role!: Role

}



enum Role{
  USER,
  ADMIN
}