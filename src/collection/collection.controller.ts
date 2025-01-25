import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { CollectionStatus } from './collection-status.enum';
import { CollectionStatusValidationPipe } from './pipes/collection-status-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';

// @UseGuards(AuthGuard())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Get()
    @ApiOperation({ summary: 'get all public&private collections' })
    getAllCollection(): Promise<Collection[]> {
        return this.collectionService.getAllCollection();
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
