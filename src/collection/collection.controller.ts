import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { CollectionStatus } from './collection-status.enum';
import { CollectionStatusValidationPipe } from './pipes/collection-status-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('collection')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'create collection' })
    createCollection(
        @Body() createCollectionDto: CreateCollectionDto 
    ) : Promise<Collection> {
        return this.collectionService.createCollection(createCollectionDto);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'get collection by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    getCollectionById(@Param('id') id: number): Promise<Collection> {
        return this.collectionService.getCollectionById(id);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'delete collection by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    deleteCollection(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.collectionService.deleteCollection(id);
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'update collection status by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    @ApiBody({ description: 'collection status', examples: { example1: {value: { status:'PRIVATE'}}}})
    updateCollectionStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', CollectionStatusValidationPipe) status: CollectionStatus
    ): Promise<Collection> {
        return this.collectionService.updateCollectionStatus(id, status)
    }
}
