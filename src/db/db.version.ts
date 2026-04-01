import db from './db.client';

const getDBVersion = (): string | undefined =>
  db.query<{ version: string }, []>('SELECT sqlite_version() as version').get()
    ?.version;

export default getDBVersion;
