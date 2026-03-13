import { Database } from 'bun:sqlite';

import migrate from './migrations.db';

const db = new Database('./mydb.sqlite', { strict: true });

migrate(db);

export default db;
