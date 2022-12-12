import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/constants';
import { GoogleStrategy } from './utils/google.strategy';
import { UsersModule } from '../users/users.module';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    GoogleStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
