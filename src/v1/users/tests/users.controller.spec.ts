import { Test, TestingModule } from '@nestjs/testing';
import { CreateChildrenDetails } from 'src/utils/types';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  const bodyMock = {} as unknown as CreateChildrenDetails;
  const userIdMock = '' as unknown as string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createChildren', () => {
    it('should return status of 400', () => {
      controller.createChildren(bodyMock, userIdMock);
    });
  });
});
