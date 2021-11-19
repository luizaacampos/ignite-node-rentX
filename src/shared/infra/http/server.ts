import createConnection from '../typeorm'
import { app } from './app';

(async () => {
    await createConnection();
    app.listen(3333, () => console.log("server is running!"));
})();
