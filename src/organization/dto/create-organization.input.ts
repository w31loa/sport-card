import { Prisma } from '.prisma/client';
import { InputType, Int, Field } from '@nestjs/graphql';
import { Category } from 'src/category/model/category.model';
import { Offer } from 'src/offer/model/offer.model';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String, )
  title: string;

  @Field(() => String, )
  description: string;

  @Field(() => Number)
  categoryId: number;

  @Field(() => [Offer], )
  offers?: Array<Offer>;



}


