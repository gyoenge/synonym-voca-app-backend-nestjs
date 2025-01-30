import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get()
    @ApiOperation({ summary: 'get user info'})
    @ApiResponse({ status: 200, description: "get user info succeed"})
    @ApiResponse({ status: 401, description: "Unauthorized"})
    getUserInfo(
        @GetUser() user: User
    ) : {username: String} {
        return this.userService.getUserInfo(user);
    }
}
