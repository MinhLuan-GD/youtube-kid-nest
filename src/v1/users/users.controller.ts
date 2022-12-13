import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common/decorators';
import { Routes, Services } from 'src/utils/constants';
import { IUsersServices } from './users';

@Controller({ version: '1', path: Routes.USERS })
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersServices,
  ) {}

  @Post(':userId/childrens')
  createChildren(@Body() body, @Param('userId') userId: string) {
    return this.usersService.createChildren(body, userId);
  }

  @Get(':userId/childrens/:childrenId')
  getChildren(@Param() par) {
    return this.usersService.getChildren(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/update-password')
  updateSecretPasswordChildren(@Body() body, @Param() par) {
    return this.usersService.updateSecretPasswordChildren(
      par.userId,
      par.childrenId,
      body.secretPassword,
    );
  }

  @Patch(':userId/childrens/:childrenId/update-content')
  updateContentSettingChildren(@Body() body, @Param() par) {
    return this.usersService.updateContentSettingChildren(
      par.userId,
      par.childrenId,
      body.contentSetting,
    );
  }

  @Patch(':userId/childrens/:childrenId/add-video-history')
  addVideoHistory(@Body() body, @Param() par) {
    return this.usersService.addVideoHistory(par.userId, par.childrenId, body);
  }

  @Patch(':userId/childrens/:childrenId/clear-videos-history')
  clearVideosHistory(@Param() par) {
    return this.usersService.clearVideosHistory(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/for-child')
  updateChildrenForChildren(@Body() body, @Param() par) {
    return this.usersService.updateChildrenForChildren(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Patch(':userId/childrens/:childrenId/for-parent')
  updateChildrenForParent(@Body() body, @Param() par) {
    return this.usersService.updateChildrenForParent(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Delete(':userId/childrens/:childrenId')
  deleteChildren(@Param() par) {
    return this.usersService.deleteChildren(par.userId, par.childrenId);
  }

  @Get(':userId/childrens')
  listChildrens(@Param() par) {
    return this.usersService.listChildrens(par.userId);
  }

  @Patch(':userId/childrens/:childrenId/add-video')
  addVideoForChildren(@Body() body, @Param() par) {
    return this.usersService.addVideoForChildren(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Patch(':userId/childrens/:childrenId/remove-video')
  removeVideoForChildren(@Body() body, @Param() par) {
    return this.usersService.removeVideoForChildren(
      par.userId,
      par.childrenId,
      body.videoId,
    );
  }
}
