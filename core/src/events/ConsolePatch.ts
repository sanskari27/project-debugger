(() => {
  type ConsoleMethod = 'log' | 'warn' | 'error' | 'info' | 'debug';

  type CapturedLog = {
    method: ConsoleMethod;
    args: any[];
    timestamp: string;
  };

  const originalConsole: Partial<Record<ConsoleMethod, typeof console.log>> =
    {};
  const logs: CapturedLog[] = [];

  const methods: ConsoleMethod[] = ['log', 'warn', 'error', 'info', 'debug'];

  if (!(console as any).__isFullyMonkeyPatched__) {
    (console as any).__isFullyMonkeyPatched__ = true;

    methods.forEach(method => {
      originalConsole[method] = console[method];

      console[method] = (...args: any[]) => {
        logs.push({
          method,
          args,
          timestamp: new Date().toISOString(),
        });

        originalConsole[method]?.([method, ...args]);
      };
    });
  }
})();
