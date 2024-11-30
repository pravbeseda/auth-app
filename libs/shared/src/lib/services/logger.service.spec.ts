import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    let logger: LoggerService;

    beforeEach(() => {
        logger = new LoggerService();
        console.log = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
    });

    it('should log info messages', () => {
        logger.info('Info message');
        expect(console.log).toHaveBeenCalledWith('Info message');
    });

    it('should log warning messages', () => {
        logger.warn('Warning message');
        expect(console.warn).toHaveBeenCalledWith('Warning message');
    });

    it('should log error messages', () => {
        logger.error('Error message');
        expect(console.error).toHaveBeenCalledWith('Error message');
    });
});
