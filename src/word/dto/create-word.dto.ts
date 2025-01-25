import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWordDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'word in english', 
        example: 'hello'
    })
    word: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'word meaning',
        example: '안녕하세요'
    })
    meaning: string;

    @ApiProperty({
        description: 'word example sentence',
        example: 'Hello, my name is Jake.'
    })
    example: string;
}

