import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import createConnection from '../index';

async function create() {
    const connection = await createConnection('localhost');

    const id = uuidV4();
    const password = await hash('123456', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driverslicense)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'ABC-123')
        `
    );

    await connection.close;
}

create().then(() => console.log('admin user created!'));
