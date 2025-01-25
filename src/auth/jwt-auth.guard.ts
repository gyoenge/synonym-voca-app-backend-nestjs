import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        if (err || !user) {
            // console.error('Auth Error:', err); 
            // console.error('Auth Info:', info); 
            throw err || new UnauthorizedException('Invalid authentication token');
        }
        return user;
    }
}
