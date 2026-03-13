// oxlint-disable no-console
const logger = {
  debug: (message: string, params: Record<PropertyKey, unknown>): void =>
    console.debug(JSON.stringify({ message, ...(params && { ...params }) })),
  error: (
    message: string,
    error: Error,
    params?: Record<PropertyKey, unknown>,
  ): void => console.error(message, error, params && { ...params }),
  info: (message: string, params: Record<PropertyKey, unknown>): void =>
    console.info(JSON.stringify({ message, ...(params && { ...params }) })),
};

export default logger;
