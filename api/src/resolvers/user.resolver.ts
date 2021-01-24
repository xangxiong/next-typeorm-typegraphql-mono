import { Resolver, Query } from 'type-graphql';
import { User } from '../entities/user.entity';

@Resolver(User)
export class UserResolver {
    @Query(returns => [User])
    async users() {
        return User.find({});
    }
}
