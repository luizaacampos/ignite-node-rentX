import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionController } from '@modules/rentals/useCases/devolution/DevolutionController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionController = new DevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();


rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionController.handle);
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };