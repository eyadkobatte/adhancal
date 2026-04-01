import packageJson from '../../package.json';
import db from '../db/db.client';
import getDBVersion from '../db/db.version';

const handler = (): Response =>
  Response.json({
    apiVersion: packageJson.version,
    bunVersion: Bun.version,
    dbFilename: db.filename,
    dbVersion: getDBVersion(),
    status: 'ok',
    timestamp: Date.now(),
  });

const route = {
  handler,
};

export default route;
