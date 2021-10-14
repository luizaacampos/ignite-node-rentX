import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/UploadCarImages/UploadCarImagesController";
import multer from "multer";
import uploadConfig from '@config/upload';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
    "/specifications/:id", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id", 
    ensureAuthenticated, 
    ensureAdmin, 
    upload.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };