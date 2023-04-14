import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose, { Schema, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

import indexRouter from './routes';
import signUpRouter from './routes/sign-up';
import User from './models/User';
import logInRouter from './routes/log-in';
import logOutRouter from './routes/log-out';

dotenv.config();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect Username' });
      }

      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect Password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    return done(error);
  }
});

const mongoDb = process.env.MONGO_URI || 'mongo string';

mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.use('/log-out', logOutRouter);

app.listen(3000, () => console.log('app listening on port 3000!'));
