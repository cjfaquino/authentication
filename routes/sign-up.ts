import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User';
const signUpRouter = Router();

signUpRouter.get('/', (req, res) => res.render('sign-up-form'));

signUpRouter.post('/', async (req, res, next) => {
  try {
    bcryptjs.hash(req.body.password, 10, async (err, hashedPass) => {
      if (err) throw err;

      const user = new User({
        username: req.body.username,
        password: hashedPass,
      });
      const result = await user.save();
      res.redirect('/');
    });
  } catch (error) {
    return next(error);
  }
});

export default signUpRouter;
