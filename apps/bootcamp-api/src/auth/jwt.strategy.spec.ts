import { JwtStrategy } from './jwt.strategy';

describe('Jwt.Strategy', () => {
  it('should be defined', () => {
    expect(new JwtStrategy()).toBeDefined();
  });
});
