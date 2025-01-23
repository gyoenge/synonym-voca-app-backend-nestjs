import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: {username} })

        if(user) {
            return 'login successed';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
