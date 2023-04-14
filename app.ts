import { Request, Response } from 'express';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose, { Schema, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDb = process.env.MONGO_URI || 'mongo string';

mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const User = mongoose.model(
  'User',
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
);

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => res.render('index'));

app.listen(3000, () => console.log('app listening on port 3000!'));
