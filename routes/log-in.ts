import { Router } from 'express';
import passport from 'passport';
const logInRouter = Router();

logInRouter.get('/', (req, res) => {
  res.render('log-in');
});

logInRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

export default logInRouter;
