import { Router } from 'express';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import multer from 'multer';


const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", importCategoryController.handle);

export { categoriesRoutes}