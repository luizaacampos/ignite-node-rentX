import { AppError } from "@shared/errors/AppError";
import { FakeCategoriesRepository } from "../../repositories/fakes/FakeCategoriesRepository";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

describe("Create category", () => {

    let createCategoryUseCase: CreateCategoryUseCase;
    let fakeCategoriesRepository: FakeCategoriesRepository;

    beforeEach(() => {
        fakeCategoriesRepository = new FakeCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await fakeCategoriesRepository.findByName(category.name);
        
        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with a name that already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test",
            }
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);        

    });

  


})