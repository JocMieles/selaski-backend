import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  const mockPrisma = {
    user: {
      create: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com', messages: [] }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const dto = { name: 'John', email: 'john@example.com' };
    const user = await service.create(dto);
    expect(user).toEqual({ id: 1, ...dto });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should return all users', async () => {
    await service.findAll();
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    await service.findOne(1);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should return user messages', async () => {
    await service.findMessages(1);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { messages: true },
    });
  });
});