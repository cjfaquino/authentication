import { Router } from 'express';
const signUpRouter = Router();

signUpRouter.get('/sign-up', (req, res) => res.render('sign-up-form'));

export default signUpRouter;
