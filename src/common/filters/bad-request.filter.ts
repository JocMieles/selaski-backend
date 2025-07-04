import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isJsonSyntaxError =
      exception instanceof SyntaxError &&
      'body' in exception &&
      exception.message.includes('Unexpected token');

    const message = isJsonSyntaxError
      ? 'Invalid JSON payload'
      : exception.getResponse();

    response.status(400).json({
      statusCode: 400,
      message,
    });
  }
}