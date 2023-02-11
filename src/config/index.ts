import session from 'express-session';

export const sessionOpt: session.SessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000,
  },
};
