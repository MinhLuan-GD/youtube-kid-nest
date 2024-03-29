import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      auth: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
      maxPoolSize: 8,
      minPoolSize: 2,
      family: 4,
    }),
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
    V1Module,
  ],
})
export class AppModule {}
