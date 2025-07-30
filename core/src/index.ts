// Main entry point for the Core library
import EventsManager from './EventsManager';
import { getSessionId } from './lib/tracking';

async function init(opts: {
  sid?: string;
  uid?: string;
  channel?: string;
  eventsAPIUrl: string;
}) {
  if (typeof window === 'undefined') {
    return;
  } else if (!opts.eventsAPIUrl) {
    throw new Error('INIT FAILED: eventsAPIUrl is required');
  }

  await import('./events/ApiPatch');
  await import('./events/ConsolePatch');
  EventsManager.getInstance().init({
    trackingVariables: {
      rid: '',
      sid: opts.sid || getSessionId(),
      uid: opts.uid || '',
      origin: window?.location?.origin,
      event: '',
      channel: opts.channel || 'core',
    },
    eventsAPIUrl: opts.eventsAPIUrl || '',
  });
}

export { init };
