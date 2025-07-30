import EventsManager from '../src/EventsManager';

describe('EventsManager', () => {
  let eventsManager: EventsManager;

  beforeEach(() => {
    // Reset the singleton instance for each test
    (EventsManager as any).instance = undefined;
    eventsManager = EventsManager.getInstance();
  });

  test('should be a singleton', () => {
    const instance1 = EventsManager.getInstance();
    const instance2 = EventsManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('should initialize with empty events', () => {
    expect(eventsManager).toBeDefined();
  });

  test('should handle API events', () => {
    const apiEvent = {
      type: 'api-call' as const,
      url: 'https://test.example.com/api',
      rid: 'test-request-id',
      method: 'GET',
      body: null,
      headers: {},
      query: '',
    };

    expect(() => {
      EventsManager.on('api-call', apiEvent);
    }).not.toThrow();
  });

  test('should handle console events', () => {
    const consoleEvent = {
      type: 'console-log' as const,
      method: 'log' as const,
      args: ['test message'],
    };

    expect(() => {
      EventsManager.on('console-log', consoleEvent);
    }).not.toThrow();
  });

  test('should handle DOM events', () => {
    const domEvent = {
      type: 'dom-update' as const,
      event: {
        type: 'click',
        target: { tagName: 'DIV' }, // Mock DOM element
        timestamp: Date.now(),
      },
    };

    expect(() => {
      EventsManager.on('dom-update', domEvent);
    }).not.toThrow();
  });

  test('should initialize with tracking variables', () => {
    const trackingVariables = {
      rid: 'test-rid',
      sid: 'test-sid',
      uid: 'test-uid',
      origin: 'https://test.example.com',
      event: 'test-event',
      channel: 'test-channel',
    };

    const eventsAPIUrl = 'https://test.example.com/events';

    expect(() => {
      eventsManager.init({
        trackingVariables,
        eventsAPIUrl,
      });
    }).not.toThrow();
  });
});
