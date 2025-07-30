import EventsManager from '../EventsManager';
import { ConsoleMethod } from '../types';

// Only execute in browser environment
if (typeof window !== 'undefined') {
  (() => {
    const originalConsole: Partial<Record<ConsoleMethod, typeof console.log>> =
      {};

    const methods: ConsoleMethod[] = ['log', 'warn', 'error', 'info'];

    if (!(console as any).__patched__) {
      (console as any).__patched__ = true;

      methods.forEach(method => {
        originalConsole[method] = console[method];

        console[method] = (...args: any[]) => {
          EventsManager.on('console-log', {
            type: 'console-log',
            method,
            args,
          });
          originalConsole[method]?.(...args);
        };
      });
    }
  })();
}
