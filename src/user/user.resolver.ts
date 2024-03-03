import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
   createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return  this.userService.create(createUserInput);
  }



  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'userById' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }
  @Query(() => User, { name: 'userByLogin' })
  findOneByLogin(@Args('login', { type: () => String }) login: string) {
    return this.userService.findOneByLogin(login);
  }
  @Query(() => User, { name: 'userByCardNumber' })
  findOneByCardNumber(@Args('cardNumber', { type: () => String }) cardNumber: string) {
    return this.userService.findOneByCardNumber(cardNumber);
  }

  @Mutation(() => User) 
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
