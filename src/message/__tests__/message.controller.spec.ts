import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '../message.controller';
import { MessageService } from '../message.service';
import { CreateMessageDto } from '../dto/create-message.dto';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  const mockMessageService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const dto: CreateMessageDto = { content: 'Hola mundo', userId: 1 };
    mockMessageService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all messages', async () => {
    const messages = [{ id: 1, content: 'Hola mundo', userId: 1 }];
    mockMessageService.findAll.mockResolvedValue(messages);

    const result = await controller.findAll();
    expect(result).toEqual(messages);
    expect(service.findAll).toHaveBeenCalled();
  });
});