import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementatios/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
   DayjsDateProvider 
)