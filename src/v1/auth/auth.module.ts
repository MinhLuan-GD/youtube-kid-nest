import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/constants';
import { GoogleStrategy } from './utils/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    GoogleStrategy,
  ],
})
export class AuthModule {}
