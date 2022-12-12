import { MongooseModuleOptions } from '@nestjs/mongoose';
import session from 'express-session';

export const sessionOpt: session.SessionOptions = {
  secret: 'luan',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000,
  },
};
