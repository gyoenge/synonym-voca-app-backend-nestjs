import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetUser } from '../auth/get-user.decorator';
import { CollectionStatusValidationPipe } from './pipes/collection-status-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { updateCollectionDto } from './dto/update-collection.dto';

// @UseGuards(AuthGuard())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Get()
    @ApiOperation({ summary: 'get all own (private&public) collections' })
    getAllCollection(
        @GetUser() user: User
    ): Promise<Collection[]> {
        return this.collectionService.getAllCollection(user);
    }

    @Get('/public')
    @ApiOperation({ summary: 'get all other\'s public collections' })
    getAllPublicCollection(
        @GetUser() user: User
    ): Promise<Collection[]> {
        return this.collectionService.getAllPublicCollection(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'create collection' })
    createCollection(
        @Body() createCollectionDto: CreateCollectionDto,
        @GetUser() user: User
    ) : Promise<Collection> {
        return this.collectionService.createCollection(createCollectionDto, user);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'get collection by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    getCollectionById(@Param('id') id: number): Promise<Collection> {
        return this.collectionService.getCollectionById(id);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'delete collection by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    deleteCollection(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.collectionService.deleteCollection(id);
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'update collection by id' })
    @ApiParam({ name: 'id', description: 'collection id', example: 1})
    @ApiBody({ description: 'collection status', examples: { example1: {value: { title: 'Test Updated Collection', description: "updataed description", status:'PRIVATE'}}}})
    updateCollectionStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCollectionDto: updateCollectionDto
    ): Promise<Collection> {
        return this.collectionService.updateCollectionStatus(id, updateCollectionDto)
    }
}
