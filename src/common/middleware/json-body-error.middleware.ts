import { Request, Response, NextFunction } from 'express';

export function jsonBodyErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      statusCode: 400,
      message: 'El cuerpo de la solicitud contiene JSON inválido',
      error: 'Bad Request',
      path: req.originalUrl,
    });
  }

  next();
}