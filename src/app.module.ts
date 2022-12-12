import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:27017`, {
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
    V1Module,
  ],
})
export class AppModule {}
