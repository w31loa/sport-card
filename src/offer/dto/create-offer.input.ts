import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOfferInput {
  
  @Field(() => String)
  title!: string;

  
  @Field(() => Int)
  organizationId!: number;
}
