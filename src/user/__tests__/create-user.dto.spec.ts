import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a valid user', async () => {
    const dto = new CreateUserDto();
    dto.name = 'Juan';
    dto.email = 'juan@mail.com';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if name is missing', async () => {
    const dto = new CreateUserDto();
    dto.email = 'juan@mail.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail if email is invalid', async () => {
    const dto = new CreateUserDto();
    dto.name = 'Juan';
    dto.email = 'nombre-no-es-email';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
});