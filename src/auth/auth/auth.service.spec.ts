import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const credentials = { username: 'example', password: 'password' };
      const token = await service.login(credentials);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should throw an exception for invalid credentials', async () => {
      const credentials = { username: 'invalid', password: 'wrongpassword' };
      await expect(service.login(credentials)).rejects.toThrowError('Invalid credentials');
    });
  });
});
