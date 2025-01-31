import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WordService } from './word.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './word.entity';
import { WordPos } from './word-pos.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('word')
export class WordController {
    constructor(private wordService: WordService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'create word' })
    createCollection(
        @Body() createWordDto: CreateWordDto
    ) : Promise<Word> {
        return this.wordService.createWord(createWordDto);
    }

    @Get('/search')
    @ApiOperation({ summary: 'get words by wordname' })
    @ApiQuery({ name: 'word', description: 'Word name', example: 'hello' })
    getWordsByName(
        @Query('word') wordname: string
    ): Promise<Word[]> {
        return this.wordService.getWordsByName(wordname)
    }
    
    @Get('/all')
    @ApiOperation({ summary: 'Get all words owned by the user' })
    getAllWords(
        @GetUser() user: User
    ): Promise<Word[]> {
        return this.wordService.getAllWords(user);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'get word by id' })
    @ApiParam({ name: 'id', description: 'word id', example: 1})
    getCollectionById(@Param('id') id: number): Promise<Word> {
        return this.wordService.getWordById(id);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'delete word by id' })
    @ApiParam({ name: 'id', description: 'word id', example: 1})
    deleteCollection(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.wordService.deleteWord(id);
    }
    
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'update word by id'})
    @ApiParam({ name: 'id', description: 'word id', example: 1})
    @ApiBody({ description: 'word', examples: { example1: {value: { wordname:'hello', pos: WordPos.VERB, meaning: '안녕하신가요', example: 'hello world', collection_ids: [,]}}}})
    updateWord(
        @Param('id', ParseIntPipe) id: number,
        @Body() createWordDto: CreateWordDto 
    ): Promise<Word> {
        return this.wordService.updateWord(id, createWordDto);
    }

    @Get('/collection/:id')
    @ApiOperation({ summary: 'Get words by collection ID' })
    @ApiParam({ name: 'id', description: 'Collection ID', example: 1 })
    getWordsByCollectionId(
        @Param('id', ParseIntPipe) collectionId: number
    ): Promise<Word[]> {
        return this.wordService.getWordsByCollectionId(collectionId);
    }
}
