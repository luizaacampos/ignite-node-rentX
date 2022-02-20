import { ResetUserPasswordController } from '@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot",sendForgotMailController.handle);
passwordRoutes.post("/reset",resetUserPasswordController.handle);

export { passwordRoutes };