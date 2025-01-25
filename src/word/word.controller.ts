import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WordService } from './word.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './word.entity';

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
    @ApiBody({ description: 'word', examples: { example1: {value: { word:'hello', meaning: '안녕하신가요', example: 'hello world'}}}})
    updateWord(
        @Param('id', ParseIntPipe) id: number,
        @Body() createWordDto: CreateWordDto 
    ): Promise<Word> {
        return this.wordService.updateWord(id, createWordDto);
    }
}
