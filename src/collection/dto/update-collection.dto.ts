import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CollectionStatus } from "../collection-status.enum";

export class updateCollectionDto {
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

    @IsNotEmpty()
    @ApiProperty({
        description: "collection status",
        example: CollectionStatus.PRIVATE
    })
    status: CollectionStatus
}