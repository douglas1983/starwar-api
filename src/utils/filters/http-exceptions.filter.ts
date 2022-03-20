import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof PrismaClientKnownRequestError
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof PrismaClientKnownRequestError
        ? exception.message
        : exception;

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(message)} `,
    );

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
