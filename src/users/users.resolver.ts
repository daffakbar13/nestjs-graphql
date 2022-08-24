// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { UserService } from './users.service';
// import { User } from './entities/user.entity';
// import { CreateUserInput, FindUser, LimitUser, UpdateUserInput } from './dto/user.dto';

// @Resolver(() => User)
// export class UserResolver {
//   constructor(private readonly userService: UserService) { }

//   @Mutation(() => User)
//   login(@Args('createUserInput') createUserInput: CreateUserInput) {
//     return this.userService.create(createUserInput);
//   }

//   @Query(() => User, { name: 'user' })
//   findAll(
//     @Args(LimitUser.KEY) limitUser: LimitUser,
//     @Args(FindUser.KEY) findUser: FindUser
//   ) {
//     return this.userService.findAll(limitUser, findUser);
//   }

//   @Mutation(() => User)
//   updateUser(
//     @Args(UpdateUserInput.KEY) updateUserInput: UpdateUserInput
//   ) {
//     return this.userService.update(updateUserInput);
//   }

//   @Mutation(() => User)
//   removeUser(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.remove(id);
//   }
// }
