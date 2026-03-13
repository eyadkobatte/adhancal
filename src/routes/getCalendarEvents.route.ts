import adhanTimeConfiguration from '../db/adhanTimeConfiguration.repository';

const handler = (): Response => {
  const configurations = adhanTimeConfiguration.getAll();
  return Response.json({ configurations });
};

const route = {
  handler,
};

export default route;
