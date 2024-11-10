import * as dotenv from 'dotenv';
import { join } from 'path';

export class EnvService {
    constructor() {
        dotenv.config({ path: join(__dirname, '../../../../../.env') });
    }

    get(key: string): string | undefined {
        return process.env[key];
    }
}
