import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OfferService } from './offer.service';
import { Offer } from './model/offer.model';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}


  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Offer)
  createOffer(@Args('createOfferInput') createOfferInput: CreateOfferInput) {
    return this.offerService.create(createOfferInput);
  }

  @Query(() => [Offer], { name: 'offer' })
  findAll() {
    return this.offerService.findAll();
  }

  @Query(() => Offer, { name: 'offer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.findOne(id);
  }


  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Offer)
  updateOffer(@Args('updateOfferInput') updateOfferInput: UpdateOfferInput) {
    return this.offerService.update(updateOfferInput.id, updateOfferInput);
  }


  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Mutation(() => Offer)
  removeOffer(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.remove(id);
  }
}
