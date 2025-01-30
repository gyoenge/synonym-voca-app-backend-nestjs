import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    getUserInfo(user: User): {username: String} {
        return {
            username: user.username
        }
    }
}
