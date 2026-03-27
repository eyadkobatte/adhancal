import { Database } from 'bun:sqlite';

import migrate from './migrations.db';

const db = new Database('./adhancal.db', { strict: true });

migrate(db);

export default db;
