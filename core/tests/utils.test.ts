import { generateRandomId, generateTrackingHeaders } from '../src/lib/utils';

describe('Utility Functions', () => {
  describe('generateRandomId', () => {
    test('should generate a random string', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();

      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
      expect(id1).not.toBe(id2);
    });

    test('should generate unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateRandomId());
      }
      expect(ids.size).toBe(100);
    });
  });

  describe('generateTrackingHeaders', () => {
    test('should generate tracking headers', () => {
      const trackingVariables = {
        rid: 'test-rid',
        sid: 'test-sid',
        uid: 'test-uid',
        origin: 'https://test.example.com',
        event: 'test-event',
        channel: 'test-channel',
      };

      const headers = generateTrackingHeaders(trackingVariables);

      expect(headers).toBeDefined();
      expect(typeof headers).toBe('object');
      expect(headers['X-ORIGIN']).toBe('https://test.example.com');
      expect(headers['X-RID']).toBe('test-rid');
      expect(headers['X-SID']).toBe('test-sid');
      expect(headers['X-UID']).toBe('test-uid');
      expect(headers['X-EVENT']).toBe('test-event');
      expect(headers['X-CHANNEL']).toBe('test-channel');
    });

    test('should handle empty tracking variables', () => {
      const trackingVariables = {
        rid: '',
        sid: '',
        uid: '',
        origin: '',
        event: '',
        channel: '',
      };

      const headers = generateTrackingHeaders(trackingVariables);

      expect(headers).toBeDefined();
      expect(headers['X-ORIGIN']).toBe('');
      expect(headers['X-RID']).toBeDefined(); // Will be a random ID when empty
      expect(headers['X-SID']).toBe('');
      expect(headers['X-UID']).toBe('');
      expect(headers['X-EVENT']).toBe('');
      expect(headers['X-CHANNEL']).toBe('');
    });

    test('should generate random RID when rid is empty', () => {
      const trackingVariables = {
        rid: '',
        sid: 'test-sid',
        uid: 'test-uid',
        origin: 'https://test.example.com',
        event: 'test-event',
        channel: 'test-channel',
      };

      const headers = generateTrackingHeaders(trackingVariables);

      expect(headers['X-RID']).toBeDefined();
      expect(headers['X-RID']).not.toBe('');
      expect(typeof headers['X-RID']).toBe('string');
    });
  });

  describe('getSessionId', () => {
    test('should handle Node.js environment gracefully', () => {
      // Mock sessionStorage for Node.js environment
      const originalSessionStorage = global.sessionStorage;
      global.sessionStorage = {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        key: jest.fn(),
        length: 0,
      } as any;

      try {
        // Import here to avoid issues with sessionStorage
        const { getSessionId } = require('../src/lib/tracking');

        const sessionId = getSessionId();
        expect(typeof sessionId).toBe('string');
        expect(sessionId.length).toBeGreaterThan(0);
      } finally {
        global.sessionStorage = originalSessionStorage;
      }
    });
  });
});
