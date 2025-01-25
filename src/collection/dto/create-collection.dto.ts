import { IsNotEmpty } from "class-validator";

export class CreateCollectionDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}