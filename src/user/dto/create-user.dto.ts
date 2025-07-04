import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo debe contener letras y espacios',
  })
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;
}