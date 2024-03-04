import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Category } from 'src/category/model/category.model';
import { Offer } from 'src/offer/model/offer.model';

@ObjectType()
export class Organization {
  @Field(()=> ID , {nullable:false})
  id!: number


  @Field(() => String)
  title!: string;


  @Field(() => String)
  description!: string;


  @Field(() => Int)
  categoryId!: number;
  
  


  @Field(() => [Offer])
  offers: Array<Offer>;
}
