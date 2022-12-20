import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Inject,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Routes, Services } from 'src/utils/constants';
import { CreateChildrenDto } from './dtos/CreateChildren.dto';
import { CreateSubscriptionDto } from './dtos/CreateSubscription.dto';
import { CreateVideoForChildrenDto } from './dtos/CreateVideoForChildren.dto';
import { CreateVideoHistoryDto } from './dtos/CreateVideoHistory.dto';
import { ModifyChildrenForChildrenDto } from './dtos/ModifyChildrenForChildren.dto';
import { ModifyChildrenForParentDto } from './dtos/ModifyChildrenForParent.dto';
import { UpdateKidActivityDto } from './dtos/UpdateKidActivity.dto';
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

  @Patch(':userId/childrens/:childrenId/set-time-expire')
  setTimeExpire(@Param() par: any) {
    return this.usersService.setTimeExpire(par.userId, par.childrenId);
  }

  @Cron('0 0 0 * * *')
  reSetTimeExpire() {
    return this.usersService.reSetTimeExpire();
  }

  @Put(':userId/kid-activity/:childrenId')
  updateKidActivity(@Param() par: any, @Body() body: UpdateKidActivityDto) {
    return this.usersService.updateKidActivity(
      par.userId,
      par.childrenId,
      body,
    );
  }

  @Patch(':userId/childrens/:childrenId/block-video')
  blockVideo(@Param() par: any, @Body('videoId') videoId: string) {
    return this.usersService.blockVideo(par.userId, par.childrenId, videoId);
  }

  @Patch(':userId/childrens/:childrenId/clear-block-video')
  clearBlockVideo(@Param() par: any) {
    return this.usersService.clearBlockVideo(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/block-search')
  blockSearch(@Param() par: any) {
    return this.usersService.updateAllowSearch(
      par.userId,
      par.childrenId,
      false,
    );
  }

  @Patch(':userId/childrens/:childrenId/allow-search')
  allowSearch(@Param() par: any) {
    return this.usersService.updateAllowSearch(
      par.userId,
      par.childrenId,
      true,
    );
  }

  @Post(':userId/childrens/:childrenId/subscriptions')
  subscribeChannel(@Param() par: any, @Body() body: CreateSubscriptionDto) {
    return this.usersService.subscribeChannel(par.userId, par.childrenId, body);
  }

  @Delete(':userId/childrens/:childrenId/subscriptions/:channelId')
  unsubscribeChannel(@Param() par: any) {
    return this.usersService.unsubscribeChannel(
      par.userId,
      par.childrenId,
      par.channelId,
    );
  }

  @Patch(':userId/childrens/:childrenId/block-channel')
  blockChannel(@Param() par: any, @Body('channelId') channelId: string) {
    return this.usersService.blockChannel(
      par.userId,
      par.childrenId,
      channelId,
    );
  }

  @Patch(':userId/childrens/:childrenId/clear-block-channel')
  clearBlockChannel(@Param() par: any) {
    return this.usersService.clearBlockChannel(par.userId, par.childrenId);
  }

  @Patch(':userId/childrens/:childrenId/block-chat')
  blockChat(@Param() par: any) {
    return this.usersService.updateAllowChat(par.userId, par.childrenId, false);
  }

  @Patch(':userId/childrens/:childrenId/allow-chat')
  allowChat(@Param() par: any) {
    return this.usersService.updateAllowChat(par.userId, par.childrenId, true);
  }
}
