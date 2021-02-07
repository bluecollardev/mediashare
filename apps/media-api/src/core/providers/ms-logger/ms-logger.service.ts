import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MsLoggerService implements LoggerService {
  private writeMessage(
    message: any,
    args: { context?: string; trace?: string }
  ) {
    const { trace = '', context = '' } = args;
    console.log(message);
    console.log(context);
    console.log(trace);
  }

  constructor(private isProduction: string) {}

  log(message: any, context?: string) {
    this.writeMessage(message, { context });
  }
  error(message: any, trace?: string, context?: string) {
    this.writeMessage(message, { trace, context });
  }
  warn(message: any, context?: string) {
    this.writeMessage(message, { context });
  }
  debug?(message: any, context?: string) {
    if (!this.isProduction) this.writeMessage(message, { context });
  }
  verbose?(message: any, context?: string) {
    if (!this.isProduction) this.writeMessage(message, { context });
  }
}
