import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        description: 'user name',
        example: 'example user'
    })
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        description: 'user password',
        example: '12345'
    })
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'passwword only accepts english and number'
    })
    password: string; 
}