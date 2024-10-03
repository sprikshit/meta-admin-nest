import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './getDetails.controller';
import { Userservice } from '../services/getDetails.service';
import ResponseModel, { IResponse } from '../utils/response.model';

describe('UserController', () => {
  let controller: any;
  let userService: any;

  const mockUserService = {
    getAllUsersCount: jest.fn(),
    getUsersCountByTimePeriod: jest.fn(),
    countProPowerMatrix: jest.fn(),
    countProPowerGlobal: jest.fn(),
    getActiveUsersCount: jest.fn(),
    getInactiveUsersCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: Userservice,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<Userservice>(Userservice);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsersCount', () => {
    it('should return all users count successfully', async () => {
      mockUserService.getAllUsersCount.mockResolvedValue(100);
      const result = await controller.getAllUsersCount();
      expect(result).toEqual(ResponseModel.setSuccess(200, 'successful', { response: 100 }));
    });


    it('should handle error when failing to fetch all users count', async () => {
      mockUserService.getAllUsersCount.mockRejectedValue(new Error('Fetch failed'));
      const result = await controller.getAllUsersCount();
      expect(result).toEqual(ResponseModel.setError(500, 'Failed to fetch user count', 'Fetch failed'));
    });
  });

    });

