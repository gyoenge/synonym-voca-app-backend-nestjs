import { DataSource, Repository } from "typeorm";
import { Collection } from "./collection.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { CollectionStatus } from "./collection-status.enum";
import { User } from "../auth/user.entity";

export class CollectionRepository extends Repository<Collection> {
    constructor(@InjectRepository(Collection) private dataSource: DataSource) {
        super(Collection, dataSource.manager)
    }

    async createCollection(createCollectionDto: CreateCollectionDto, user: User): Promise<Collection> {
        const { title, description } = createCollectionDto;

        const collection = this.create({
            title,
            description,
            status: CollectionStatus.PUBLIC,
            user
        })

        await this.save(collection);

        return collection;
    }
}