import fs from 'fs';
import csvParse from 'csv-parse';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path); //stream de leitura criado
            const categories: IImportCategory[] = [];
        
            const parseFile = csvParse();
        
            stream.pipe(parseFile); //todos os pedaços lidos são enviados para parseFile
        
            parseFile.on("data", async (line) => {  //le linha por linha e coloca no array
                const [name, description] = line
                categories.push({
                    name, 
                    description,
                })
            })
            .on("end", () => {
                fs.promises.unlink(file.path) // apaga arquivo após jogar para banco de dados
                resolve(categories)
            })
            .on("error", (err) => {
                reject(err)
            })
        })
    } 
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const categoryExists = this.categoriesRepository.findByName(name); // salvando categories no banco de dados

            if (!categoryExists) {
                this.categoriesRepository.create({
                    name, 
                    description,
                })
            }
        })
    }
}

export { ImportCategoryUseCase }