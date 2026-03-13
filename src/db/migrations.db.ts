import type { Database } from 'bun:sqlite';

const MIGRATIONS = [
  {
    id: 'init',
    statement: `CREATE TABLE IF NOT EXISTS adhanTimeConfiguration (id TEXT PRIMARY KEY, city TEXT, country TEXT)`,
  },
] as const;

const migrate = (db: Database): void => {
  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const applied = new Set(
    db
      .query<{ id: string }, []>('SELECT id FROM migrations')
      .all()
      .map((row) => row.id),
  );

  const run = db.transaction(() => {
    for (const migration of MIGRATIONS) {
      if (!applied.has(migration.id)) {
        db.run(migration.statement);
        db.run('INSERT INTO migrations (id) VALUES (?)', [migration.id]);
      }
    }
  });

  run();
};

export default migrate;
