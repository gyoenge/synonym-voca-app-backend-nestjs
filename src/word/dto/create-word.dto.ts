import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { WordPos } from "../word-pos.enum";

export class CreateWordDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'word in english', 
        example: 'hello'
    })
    wordname: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'word meaning',
        example: '안녕하세요'
    })
    meaning: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'word p.o.s(Part Of Speech)', 
        example: 'VERB'
    })
    pos: WordPos; 

    @IsString()
    @ApiProperty({
        description: 'word example sentence',
        example: 'Hello, my name is Jake.'
    })
    example: string;

    @IsArray()
    @ApiProperty({
        description: 'word\'s corresponding collection ids',
        example: [2,]
    })
    collection_ids: number[];

}

