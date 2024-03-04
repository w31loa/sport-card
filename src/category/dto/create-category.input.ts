import { InputType, Int, Field } from '@nestjs/graphql';
import { Organization } from 'src/organization/model/organization.model';

@InputType()
export class CreateCategoryInput {
  @Field(()=> String)
  title!: string

}
