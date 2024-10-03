import { Test, TestingModule } from '@nestjs/testing';
import { Userservice } from './getDetails.service';
import { getModelToken } from '@nestjs/mongoose';
import { HelperService } from './helper';
import { user } from 'src/schemas/user.schema';
import { Pkg } from 'src/schemas/pkgs.schema';
import { userdetails } from 'src/schemas/userdetails.schema';

describe('Userservice', () => {
  let service: Userservice;
  let userModel: any;
  let pkgsModel: any;
  let userdetailsModel: any;
  let helperService: any;

  beforeEach(async () => {
    userModel = {
      countDocuments: jest.fn(),
      aggregate: jest.fn(),
    };
    pkgsModel = {
      aggregate: jest.fn(),
    };
    userdetailsModel = {
      countDocuments: jest.fn(),
    };
    helperService = {
      getStartDateByTimeRange: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Userservice,
        {
          provide: HelperService,
          useValue: helperService,
        },
        {
          provide: getModelToken('user'),
          useValue: userModel,
        },
        {
          provide: getModelToken('Pkg'),
          useValue: pkgsModel,
        },
        {
          provide: getModelToken('user_details'),
          useValue: userdetailsModel,
        },
      ],
    }).compile();

    service = module.get<Userservice>(Userservice);
  });

  describe('getAllUsersCount', () => {
    it('should return total user count', async () => {
      userModel.countDocuments.mockResolvedValue(10);
      const result = await service.getAllUsersCount();
      expect(result).toBe(10);
    });

    it('should return 0 if an error occurs', async () => {
      userModel.countDocuments.mockRejectedValue(new Error('Some error'));
      const result = await service.getAllUsersCount();
      expect(result).toBe(0);
    });
  });

  describe('getUsersCountByTimePeriod', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return total user count for a given time period', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      userModel.aggregate.mockResolvedValue([{ count: 10 }]);  
  
      const result = await service.getUsersCountByTimePeriod('2022-01-01');
      expect(result).toBe(10);
    });
  
    it('should return 0 if no documents are found', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      userModel.aggregate.mockResolvedValue([]);  
  
      const result = await service.getUsersCountByTimePeriod('2022-01-01');
      expect(result).toBe(0);
    });
  
    it('should return 0 if an error occurs', async () => {
      helperService.getStartDateByTimeRange.mockRejectedValue(new Error('Some error'));
      userModel.aggregate.mockRejectedValue(new Error('Some error'));
  
      const result = await service.getUsersCountByTimePeriod('2022-01-01');
      expect(result).toBe(0);
    });
  });

  describe('countProPowerMatrix', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return the count of pro-power-matrix documents for a given time period', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      pkgsModel.aggregate.mockResolvedValue([{ count: 5 }]);  // Mock the aggregation result
  
      const result = await service.countProPowerMatrix('2022-01-01');
      expect(result).toBe(5);
    });
  
    it('should return 0 if no pro-power-matrix documents are found', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      pkgsModel.aggregate.mockResolvedValue([]); 
      const result = await service.countProPowerMatrix('2022-01-01');
      expect(result).toBe(0);
    });
  
    it('should return 0 if an error occurs', async () => {
      helperService.getStartDateByTimeRange.mockRejectedValue(new Error('Some error'));
      pkgsModel.aggregate.mockRejectedValue(new Error('Some error'));
  
      const result = await service.countProPowerMatrix('2022-01-01');
      expect(result).toBe(0);
    });
  });
  
  describe('countProPowerGlobal', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return the count of pro-power-matrix documents for a given time period', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      pkgsModel.aggregate.mockResolvedValue([{ count: 5 }]);  // Mock the aggregation result
  
      const result = await service.countProPowerGlobal('2022-01-01');
      expect(result).toBe(5);
    });
  
    it('should return 0 if no pro-power-matrix documents are found', async () => {
      helperService.getStartDateByTimeRange.mockResolvedValue('2022-01-01');
      pkgsModel.aggregate.mockResolvedValue([]);  
  
      const result = await service.countProPowerGlobal('2022-01-01');
      expect(result).toBe(0);
    });
  
    it('should return 0 if an error occurs', async () => {
      helperService.getStartDateByTimeRange.mockRejectedValue(new Error('Some error'));
      pkgsModel.aggregate.mockRejectedValue(new Error('Some error'));
  
      const result = await service.countProPowerGlobal('2022-01-01');
      expect(result).toBe(0);
    });
  });
  
  describe('getActiveUsersCount', () => {
    it('should return the count of inactive users', async () => {
      userdetailsModel.countDocuments.mockResolvedValue(5);
      const result = await service.getActiveUsersCount();
      expect(result).toBe(5);
    });

    it('should return 0 if an error occurs', async () => {
      userdetailsModel.countDocuments.mockRejectedValue(
        new Error('Error generated by prikshit'),
      );
      const result = await service.getActiveUsersCount();
      expect(result).toBe(0);
    });
  });
  
  describe('getInactiveUsersCount', () => {
    it('should return the count of inactive users', async () => {
      userdetailsModel.countDocuments.mockResolvedValue(5);
      const result = await service.getInactiveUsersCount();
      expect(result).toBe(5);
    });

    it('should return 0 if an error occurs', async () => {
      userdetailsModel.countDocuments.mockRejectedValue(
        new Error('Error generated by prikshit'),
      );
      const result = await service.getInactiveUsersCount();
      expect(result).toBe(0);
    });
  });
});
