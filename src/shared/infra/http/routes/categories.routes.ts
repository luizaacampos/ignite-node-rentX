import { Router } from 'express';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import multer from 'multer';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';


const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    ensureAuthenticated, 
    ensureAdmin, 
    importCategoryController.handle
);

export { categoriesRoutes}