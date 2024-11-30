import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    debug(...message: string[]): void {
        console.log(message);
    }

    info(...message: string[]): void {
        console.log(message);
    }

    warn(...message: string[]): void {
        console.warn(message);
    }

    error(...message: string[]): void {
        console.error(...message);
    }
}
