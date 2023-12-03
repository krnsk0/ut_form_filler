export type Logger = ReturnType<typeof makeLogger>;

export let temporaryDisableLogger = false;

export const pauseLogger = () => {
  temporaryDisableLogger = true;
};

export const resumeLogger = () => {
  temporaryDisableLogger = false;
};

const invokeLogger =
  (methodName: 'log' | 'error' | 'warn' | 'info', prefix: string) =>
  (...args: unknown[]) => {
    if (import.meta.env.DEV && !temporaryDisableLogger) {
      // eslint-disable-next-line no-console
      console[methodName](`[${prefix}]`, ...args);
    }
  };

export const makeLogger = (prefix: string, mute?: boolean) => {
  const fork = (newPrefix: string) => {
    return makeLogger(`${prefix}::${newPrefix}`, mute);
  };

  if (mute) {
    return {
      log: () => {},
      error: () => {},
      warn: () => {},
      info: () => {},
      fork,
    };
  }

  return {
    log: invokeLogger('log', prefix),
    error: invokeLogger('error', prefix),
    warn: invokeLogger('warn', prefix),
    info: invokeLogger('info', prefix),
    fork,
  };
};
