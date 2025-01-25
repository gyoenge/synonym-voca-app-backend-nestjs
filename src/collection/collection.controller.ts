import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { CollectionStatus } from './collection-status.enum';
import { CollectionStatusValidationPipe } from './pipes/collection-status-validation.pipe';

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

    @Delete('/:id')
    deleteCollection(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.collectionService.deleteCollection(id);
    }

    @Patch('/:id')
    updateCollectionStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', CollectionStatusValidationPipe) status: CollectionStatus
    ): Promise<Collection> {
        return this.collectionService.updateCollectionStatus(id, status)
    }
}
