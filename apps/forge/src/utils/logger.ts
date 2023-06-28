import { LoggingLevel } from '../types/types';

function print(
  message: object | string,
  level: Console['debug'] | Console['error'] | Console['info'] | Console['log'] | Console['warn'],
  ...optionalParams: unknown[]
): void {
  const strMessage = typeof message === 'string' ? message : JSON.stringify(message);
  const requestId = global.requestId;
  level(`${requestId} ${strMessage}`, ...optionalParams);
}

export function printDebug(message: object | string, ...optionalParams: unknown[]): void {
  if (global.verbosity >= LoggingLevel.DEBUG) print(message, console.debug, ...optionalParams);
}

export function printError(message: object | string, ...optionalParams: unknown[]): void {
  if (global.verbosity >= LoggingLevel.ERROR) print(message, console.error, ...optionalParams);
}

export function printInfo(message: object | string, ...optionalParams: unknown[]): void {
  if (global.verbosity >= LoggingLevel.INFO) print(message, console.info, ...optionalParams);
}

export function printLog(message: object | string, ...optionalParams: unknown[]): void {
  if (global.verbosity >= LoggingLevel.LOG) print(message, console.log, ...optionalParams);
}

export function printWarn(message: object | string, ...optionalParams: unknown[]): void {
  if (global.verbosity >= LoggingLevel.WARN) print(message, console.warn, ...optionalParams);
}

export function parseLevel(verbosityString: string | undefined): LoggingLevel {
  return verbosityString && verbosityString.toUpperCase() in LoggingLevel
    ? LoggingLevel[verbosityString.toUpperCase() as keyof typeof LoggingLevel]
    : LoggingLevel.ERROR;
}
