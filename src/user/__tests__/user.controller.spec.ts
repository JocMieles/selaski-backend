import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findMessages: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { name: 'Ana', email: 'ana@test.com' };
    mockUserService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    mockUserService.findAll.mockResolvedValue([]);
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get user by id', async () => {
    mockUserService.findOne.mockResolvedValue({ id: 1, name: 'Ana', email: 'ana@test.com' });
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, name: 'Ana', email: 'ana@test.com' });
  });

  it('should get messages by user id', async () => {
    const messages = [{ id: 1, content: 'Hola', userId: 1 }];
    mockUserService.findMessages.mockResolvedValue({ id: 1, messages });

    const result = await controller.findMessages(1);
    expect(result).toEqual({ id: 1, messages });
  });
});