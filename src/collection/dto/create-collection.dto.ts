import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCollectionDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'collection title',
        example: 'example collection'
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        description: "collection description",
        example: 'example collection description'
    })
    description: string;
}