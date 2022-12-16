import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common/decorators';
import { Routes, Services } from 'src/utils/constants';
import { CreateChildrenDto } from './dtos/CreateChildren.dto';
import { CreateVideoForChildrenDto } from './dtos/CreateVideoForChildren.dto';
import { CreateVideoHistoryDto } from './dtos/CreateVideoHistory.dto';
import { ModifyChildrenForChildrenDto } from './dtos/ModifyChildrenForChildren.dto';
import { ModifyChildrenForParentDto } from './dtos/ModifyChildrenForParent.dto';
import { IUsersService } from './users';

@Controller({ version: '1', path: Routes.USERS })
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}

  @Post(':userId/childrens')
  createChildren(
    @Body() body: CreateChildrenDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.createChildren(body, userId);
  }

  @Get(':userId/childrens/:childrenId')
  getChildren(@Param() par: any) {
    return this.usersService.getChildren(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/update-password')
  updateSecretPasswordChildren(
    @Body() body: { secretPassword: string },
    @Param() par: any,
  ) {
    return this.usersService.updateSecretPasswordChildren(
      par.userId,
      par.childrenId,
      body.secretPassword,
    );
  }

  @Patch(':userId/childrens/:childrenId/update-content')
  updateContentSettingChildren(
    @Body() body: { contentSetting: string },
    @Param() par: any,
  ) {
    return this.usersService.updateContentSettingChildren(
      par.userId,
      par.childrenId,
      body.contentSetting,
    );
  }

  @Patch(':userId/childrens/:childrenId/add-video-history')
  addVideoHistory(@Body() body: CreateVideoHistoryDto, @Param() par: any) {
    return this.usersService.addVideoHistory(par.userId, par.childrenId, body);
  }

  @Patch(':userId/childrens/:childrenId/clear-videos-history')
  clearVideosHistory(@Param() par: any) {
    return this.usersService.clearVideosHistory(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/for-child')
  updateChildrenForChildren(
    @Body() body: ModifyChildrenForChildrenDto,
    @Param() par: any,
  ) {
    return this.usersService.updateChildrenForChildren(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Patch(':userId/childrens/:childrenId/for-parent')
  updateChildrenForParent(
    @Body() body: ModifyChildrenForParentDto,
    @Param() par: any,
  ) {
    return this.usersService.updateChildrenForParent(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Delete(':userId/childrens/:childrenId')
  deleteChildren(@Param() par: any) {
    return this.usersService.deleteChildren(par.userId, par.childrenId);
  }

  @Get(':userId/childrens')
  listChildrens(@Param() par: any) {
    return this.usersService.listChildrens(par.userId);
  }

  @Patch(':userId/childrens/:childrenId/add-video')
  addVideoForChildren(
    @Body() body: CreateVideoForChildrenDto,
    @Param() par: any,
  ) {
    return this.usersService.addVideoForChildren(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Patch(':userId/childrens/:childrenId/remove-video')
  removeVideoForChildren(@Body() body: { videoId: string }, @Param() par: any) {
    return this.usersService.removeVideoForChildren(
      par.userId,
      par.childrenId,
      body.videoId,
    );
  }

  @Patch(':userId/update-secret-password')
  updateSecretPassword(@Body() body: { password: string }, @Param() par: any) {
    return this.usersService.updateSecretPassword(par.userId, body.password);
  }
}
