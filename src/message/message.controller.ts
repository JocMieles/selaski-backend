import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
}