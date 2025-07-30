// Main entry point for the Core library
import EventsManager from './EventsManager';
import { getSessionId } from './lib/tracking';

async function init({ uid }: { uid: string }) {
  await import('./events/ApiPatch');
  EventsManager.getInstance().init({
    trackingVariables: {
      rid: '',
      sid: getSessionId(),
      uid: uid || '',
      origin: window?.location?.origin,
      event: '',
      channel: 'core',
    },
    eventsAPIUrl: 'https://example.com/events',
  });
}

export { init };
