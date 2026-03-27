import type {
  AdhanTimeConfigurationWithIdDto,
  AdhanTimeConfigurationWithoutIdDto,
} from './adhanTimeConfiguration.dto';
import type { Database, Statement } from 'bun:sqlite';

import db from './db.client';

class AdhanTimeConfigurationRepository {
  private readonly statements: {
    // oxlint-disable-next-line typescript/no-explicit-any
    create: Statement<AdhanTimeConfigurationWithIdDto, [any]>;
    getAll: Statement<AdhanTimeConfigurationWithIdDto, []>;
    getOne: Statement<AdhanTimeConfigurationWithIdDto, [string]>;
  };
  constructor(private readonly database: Database) {
    this.statements = {
      create: this.database.prepare(
        `INSERT INTO adhanTimeConfigurations (
          id, 
          calculationMethod, 
          latitude, 
          longitude, 
          fajrAngle, 
          maghribAngle, 
          ishaAngle, 
          ishaInterval, 
          madhab, 
          highLatitudeRule
        ) VALUES (:id, :calculationMethod, :latitude, :longitude, :fajrAngle, :maghribAngle, :ishaAngle, :ishaInterval, :madhab, :highLatitudeRule) RETURNING *`,
      ),
      getAll: this.database.prepare('SELECT * from adhanTimeConfigurations'),
      getOne: this.database.prepare(
        'SELECT * from adhanTimeConfigurations WHERE id = ?',
      ),
    };
  }

  create(
    configuration: AdhanTimeConfigurationWithoutIdDto,
  ): AdhanTimeConfigurationWithIdDto {
    const id = Bun.randomUUIDv7();
    return this.statements.create.get({
      calculationMethod: configuration.calculationMethod,
      fajrAngle: configuration.fajrAngle ?? null,
      highLatitudeRule: configuration.highLatitudeRule ?? null,
      id,
      ishaAngle: configuration.ishaAngle ?? null,
      ishaInterval: configuration.ishaInterval ?? null,
      latitude: configuration.latitude,
      longitude: configuration.longitude,
      madhab: configuration.madhab ?? null,
      maghribAngle: configuration.maghribAngle ?? null,
    }) as AdhanTimeConfigurationWithIdDto;
  }

  getAll(): AdhanTimeConfigurationWithIdDto[] {
    return this.statements.getAll.all() as AdhanTimeConfigurationWithIdDto[];
  }

  getOne(id: string): AdhanTimeConfigurationWithIdDto {
    return this.statements.getOne.get(id) as AdhanTimeConfigurationWithIdDto;
  }
}

const adhanTimeConfigurationRepository = new AdhanTimeConfigurationRepository(
  db,
);
export default adhanTimeConfigurationRepository;
