import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    @ApiOperation({ summary: 'sign up' })
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    @ApiOperation({ summary: 'sign in' })
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('authTest')
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'auth guard test' })
    @ApiBearerAuth()
    authTest(@GetUser() user: User) {
        console.log('user', user);
    }
}
