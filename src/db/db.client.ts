import { Database } from 'bun:sqlite';

import migrate from './migrations.db';

const dbPath = process.env.DB_PATH || './adhancal.db';
const db = new Database(dbPath, { strict: true });

migrate(db);

export default db;
