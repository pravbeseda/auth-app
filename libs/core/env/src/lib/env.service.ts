import * as dotenv from 'dotenv';
import { join } from 'path';
import { EnvKeys } from './constants/env-keys';

export class EnvService {
    constructor() {
        dotenv.config({ path: join(__dirname, '../../../../../.env') });
    }

    get(key: EnvKeys): string | undefined {
        return process.env[key];
    }
}
