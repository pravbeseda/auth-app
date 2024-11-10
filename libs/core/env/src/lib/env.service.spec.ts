import { EnvService } from './env.service';

describe('EnvService', () => {
    let envService: EnvService;

    beforeEach(() => {
        envService = new EnvService();
    });

    it('should load environment variables correctly', () => {
        const apiUrl = envService.get('API_URL');
        expect(apiUrl).toBeDefined();
        expect(apiUrl).toBe('http://localhost:3000');
    });
});
