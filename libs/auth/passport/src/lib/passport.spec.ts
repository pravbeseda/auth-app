import { passport } from './passport';

describe('passport', () => {
  it('should work', () => {
    expect(passport()).toEqual('passport');
  });
});
