import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
 @IsNotEmpty({ message: 'El contenido no debe estar vacío' })
  content: string;

  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  userId: number;
}