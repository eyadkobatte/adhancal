import createCalendarEvent from './routes/createCalendarEvent.route';
import getCalendarEvent from './routes/getCalendarEvent.route';
import getCalendarEvents from './routes/getCalendarEvents.route';
import validateConfiguration from './routes/validateConfiguration.route';
import logger from './utils/logger';

const server = Bun.serve({
  hostname: '0.0.0.0',
  port: 3000,
  routes: {
    '/': new Response('ok'),
    '/*': new Response('Not found', { status: 404 }),
    '/:id': getCalendarEvent,
    '/create': createCalendarEvent,
    '/events': getCalendarEvents.handler,
    '/validate': validateConfiguration,
  },
});

logger.info('Listening on server', {
  hostname: server.hostname,
  port: server.port,
});
