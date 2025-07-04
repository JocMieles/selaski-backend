import { jsonBodyErrorHandler } from '../../src/common/middleware/json-body-error.middleware';
import { Request, Response, NextFunction } from 'express';

describe('jsonBodyErrorHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      originalUrl: '/test-endpoint',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should handle SyntaxError with body and return 400', () => {
    const error = new SyntaxError('Unexpected token } in JSON');
    (error as any).body = {}; // Simular campo body requerido

    jsonBodyErrorHandler(error, req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'El cuerpo de la solicitud contiene JSON inválido',
      error: 'Bad Request',
      path: '/test-endpoint',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if error is not SyntaxError', () => {
    const error = new Error('Otro error');

    jsonBodyErrorHandler(error, req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
  });

  it('should call next() if error is SyntaxError without body', () => {
    const error = new SyntaxError('Invalid JSON');

    jsonBodyErrorHandler(error, req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
  });
});