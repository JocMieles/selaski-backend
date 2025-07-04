import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuario con Id ${dto.userId} no existe`);
    }

    return this.prisma.message.create({
      data: {
        content: dto.content,
        userId: dto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.message.findMany({ include: { user: true } });
  }
}