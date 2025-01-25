import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { CollectionStatus } from "../collection-status.enum";

export class CollectionStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        CollectionStatus.PRIVATE,
        CollectionStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}