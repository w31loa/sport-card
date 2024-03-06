import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Organization } from 'src/organization/model/organization.model';

@ObjectType()
export class Category {
  @Field(()=> ID , {nullable:false})
  id!: number

  @Field(()=> String  , {nullable: false })
  title!: string



}



