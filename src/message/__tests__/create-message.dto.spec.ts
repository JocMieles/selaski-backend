import { validate } from 'class-validator';
import { CreateMessageDto } from '../dto/create-message.dto';

describe('CreateMessageDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = new CreateMessageDto();
    dto.content = 'Mensaje válido';
    dto.userId = 1;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should return errors for missing fields', async () => {
    const dto = new CreateMessageDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});