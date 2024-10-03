import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';  // Adjust the path accordingly
import { JwtService } from '@nestjs/jwt';      // Adjust the path accordingly

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),  // Mocking the UserModel
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,  // Mocking JwtService if needed
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw BadRequestException if email is already in use', async () => {
      const signupData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      userModel.findOne.mockResolvedValue(signupData); // Mock email already in use

      await expect(authService.register(signupData)).rejects.toThrow(
        new BadRequestException('Email already in use'),
      );

      expect(userModel.findOne).toHaveBeenCalledWith({ email: signupData.email });
    });

    it('should hash the password and create a new user', async () => {
      const signupData = {
        email: 'test2@example.com',
        password: 'password123',
        name: 'Test User',
      };

      userModel.findOne.mockResolvedValue(null); // No email in use
      const hashedPassword = 'hashedPassword123';

      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve(hashedPassword));
      userModel.save = jest.fn().mockResolvedValue({ ...signupData, password: hashedPassword });

      const result = await authService.register(signupData);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: signupData.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(signupData.password, 10);
      expect(userModel.save).toHaveBeenCalledTimes(1);
      expect(result.password).toEqual(hashedPassword);
    });
  });
});
