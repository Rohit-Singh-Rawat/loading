import {
  onRequestError as interfereOnRequestError,
  register as interfereRegister,
} from "@interfere/next/instrumentation";

export function register() {
  return interfereRegister();
}

export function onRequestError(
  ...args: Parameters<typeof interfereOnRequestError>
) {
  return interfereOnRequestError(...args);
}
