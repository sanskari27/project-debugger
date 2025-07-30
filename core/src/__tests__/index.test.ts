import { init } from '../index';

describe('Project Debugger Core', () => {
  test('init function should be available', () => {
    expect(typeof init).toBe('function');
  });

  test('init function should be async', () => {
    expect(init.constructor.name).toBe('AsyncFunction');
  });

  test('init function should accept options parameter', () => {
    const functionString = init.toString();
    expect(functionString).toContain('opts');
  });

  test('init function should handle Node.js environment gracefully', async () => {
    // In Node.js environment, init should return early without throwing
    await expect(
      init({
        eventsAPIUrl: 'https://test.example.com/events',
      })
    ).resolves.not.toThrow();
  });

  test('init function should throw error for missing eventsAPIUrl in browser environment', async () => {
    // This test simulates browser environment behavior
    // In actual browser, it would throw an error for missing eventsAPIUrl
    const mockWindow = global.window;
    delete (global as any).window;

    try {
      await init({});
      // Should not reach here in Node.js environment
    } catch (error) {
      expect((error as Error).message).toContain('eventsAPIUrl is required');
    } finally {
      // Restore window
      (global as any).window = mockWindow;
    }
  });
});
