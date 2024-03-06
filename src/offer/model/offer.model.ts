import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Organization } from 'src/organization/model/organization.model';

@ObjectType()
export class Offer {
  @Field(()=> ID , {nullable:false})
  id!: number


  @Field(() => String)
  title!: string;

  
  @Field(() => Int)
  organizationId : number;
}
