import { 
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Logger
 } from "@nestjs/common";

 @Catch()
 export class LoggingExceptionFilter implements ExceptionFilter {
    private logger = new Logger(LoggingExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        this.logger.error('An unhandled exception occured:', exception);
    }
 }