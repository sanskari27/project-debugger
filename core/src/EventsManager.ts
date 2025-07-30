import { generateTrackingHeaders } from './lib/utils';
import { APIEvent, DOMEvent, TrackingVariables } from './types';

type ConsoleEvent = {
  type: 'console-log';
  message: string;
  level: 'info' | 'error' | 'warn' | 'debug';
};

type EventMap = {
  'api-call': APIEvent;
  'dom-update': DOMEvent;
  'console-log': ConsoleEvent;
};

export default class EventsManager {
  private static eventsAPIUrl = '';
  private static readonly EVENTS_SAVE_INTERVAL = 5000;
  private static trackingVariables: TrackingVariables;
  private events: { [K in keyof EventMap]: EventMap[K][] } = {
    'api-call': [],
    'dom-update': [],
    'console-log': [],
  };
  private static instance: EventsManager;

  private constructor() {
    if (EventsManager.instance) {
      return EventsManager.instance;
    }
    EventsManager.instance = this;
    setInterval(() => {
      EventsManager.instance.saveEvents();
    }, EventsManager.EVENTS_SAVE_INTERVAL);
  }

  public static getInstance() {
    if (!EventsManager.instance) {
      EventsManager.instance = new EventsManager();
    }
    return EventsManager.instance;
  }

  public init(opts: {
    trackingVariables: TrackingVariables;
    eventsAPIUrl: string;
  }) {
    EventsManager.trackingVariables = opts.trackingVariables;
    EventsManager.eventsAPIUrl = opts.eventsAPIUrl;
  }

  static on<K extends keyof EventMap>(event: K, e: EventMap[K]) {
    EventsManager.instance.events[event].push(e);
  }

  private saveEvents() {
    this.saveDomEvents();
    this.saveApiEvents();
  }

  private saveDomEvents() {
    const domEvents = this.events['dom-update'];
    if (!domEvents || !Array.isArray(domEvents) || domEvents.length === 0) {
      return;
    }
    const domEventsJson = JSON.stringify({ events: domEvents });
    this.events['dom-update'] = [];
    fetch(EventsManager.eventsAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...generateTrackingHeaders({
          ...EventsManager.trackingVariables,
          event: 'dom-update',
        }),
      },
      body: domEventsJson,
    }).catch(() => {});
  }

  private saveApiEvents() {
    const apiEvents = this.events['api-call'];
    if (!apiEvents || !Array.isArray(apiEvents) || apiEvents.length === 0) {
      return;
    }
    const rid = apiEvents?.[0]?.rid;
    const apiEventsJson = JSON.stringify({ events: apiEvents });
    this.events['api-call'] = [];
    fetch(EventsManager.eventsAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...generateTrackingHeaders({
          ...EventsManager.trackingVariables,
          event: 'dom-update',
          rid: rid || '',
        }),
      },
      body: apiEventsJson,
    });
  }
}
