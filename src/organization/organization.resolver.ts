import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './model/organization.model';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Organization)
  createOrganization(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput) {
    return this.organizationService.create(createOrganizationInput);
  }

  @Query(() => [Organization], { name: 'organizations' })
  findAll() {
    return this.organizationService.findAll();
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizationService.findOne(id);
  }
  
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Organization)
  updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Organization)
  removeOrganization(@Args('id', { type: () => Int }) id: number) {
    return this.organizationService.remove(id);
  }
}
