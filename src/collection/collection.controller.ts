import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('collection')
@UseGuards(AuthGuard())
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createCollection(
        @Body() createCollectionDto: CreateCollectionDto 
    ) : Promise<Collection> {
        return this.collectionService.createCollection(createCollectionDto);
    }

    @Get('/:id')
    getCollectionById(@Param('id') id: number): Promise<Collection> {
        return this.collectionService.getCollectionById(id);
    }
}
