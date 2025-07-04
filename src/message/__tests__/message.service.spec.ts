import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from '../message.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('MessageService', () => {
  let service: MessageService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
    message: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    await expect(service.create({ content: 'Hello', userId: 1 }))
      .rejects
      .toThrow(NotFoundException);
  });

  it('should create message if user exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
    mockPrisma.message.create.mockResolvedValue({ id: 1, content: 'Hi', userId: 1 });

    const result = await service.create({ content: 'Hi', userId: 1 });
    expect(result).toEqual({ id: 1, content: 'Hi', userId: 1 });
    expect(prisma.message.create).toHaveBeenCalledWith({
      data: { content: 'Hi', userId: 1 },
    });
  });

  it('should return all messages', async () => {
    mockPrisma.message.findMany.mockResolvedValue([]);
    const messages = await service.findAll();
    expect(messages).toEqual([]);
    expect(prisma.message.findMany).toHaveBeenCalledWith({ include: { user: true } });
  });
});