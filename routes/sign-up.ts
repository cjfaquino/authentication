import { Router } from 'express';
import User from '../models/User';
const signUpRouter = Router();

signUpRouter.get('/', (req, res) => res.render('sign-up-form'));

signUpRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
});

export default signUpRouter;
