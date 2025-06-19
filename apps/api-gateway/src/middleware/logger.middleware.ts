import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const { statusCode } = res;
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`${method} ${url} ${statusCode} - ${duration}ms`);
    });
    next();
  }
}
