import type { Database } from 'bun:sqlite';

import db from './db.client';

interface AdhanTimeConfiguratioDto {
  id: string;
  city: string;
  country: string;
}
class AdhanTimeConfiguration {
  private readonly statements: {
    create: ReturnType<Database['prepare']>;
    getAll: ReturnType<Database['prepare']>;
    getOne: ReturnType<Database['prepare']>;
  };
  constructor(private readonly database: Database) {
    this.statements = {
      create: this.database.prepare(
        'INSERT INTO adhanTimeConfiguration (id, city, country) VALUES (?, ?, ?) RETURNING *',
      ),
      getAll: this.database.prepare('SELECT * from adhanTimeConfiguration'),
      getOne: this.database.prepare(
        'SELECT * from adhanTimeConfiguration WHERE id = ?',
      ),
    };
  }

  create(configuration: AdhanTimeConfiguratioDto): AdhanTimeConfiguratioDto {
    return this.statements.create.get(
      configuration.id,
      configuration.city,
      configuration.country,
    ) as AdhanTimeConfiguratioDto;
  }

  getAll(): AdhanTimeConfiguratioDto[] {
    return this.statements.getAll.all() as AdhanTimeConfiguratioDto[];
  }

  getOne(id: string): AdhanTimeConfiguratioDto {
    return this.statements.getOne.get(id) as AdhanTimeConfiguratioDto;
  }
}

const adhanTimeConfiguration = new AdhanTimeConfiguration(db);
export default adhanTimeConfiguration;
