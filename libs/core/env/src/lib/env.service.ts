import * as dotenv from 'dotenv';
import { join } from 'path';
import { EnvKeys } from './constants/env-keys';

export class EnvService {
    private readonly config: Record<string, string | undefined>;

    constructor() {
        const envPath = join(process.cwd(), '.env');
        dotenv.config({ path: envPath });
        this.config = { ...process.env };
    }

    /** @deprecated */
    get(key: EnvKeys): string | undefined {
        return this.config[key];
    }

    getOrThrow(key: EnvKeys): string {
        const value = this.config[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is not set`);
        }
        return value;
    }
}
