export interface Response {
  success: boolean;
  code: number;
  message?: string;
  resources?: Array<unknown>;
  resource?: unknown;
  token?: unknown;
}

interface ShortResponse {
  message?: string;
  resources?: Array<unknown>;
  resource?: unknown;
  token?: unknown;
}

const NotFound = (message = 'Not Found'): Response => ({ success: false, code: 404, message });
const Unauthorized = (message = 'Unauthorized'): Response => ({ success: false, code: 401, message });
const InternalError = (message = 'InternalError'): Response => ({ success: false, code: 500, message });
const BadArguments = (message = 'Bad Arguments'): Response => ({ success: false, code: 400, message });
const Ok = (response?: ShortResponse): Response => ({
  success: true,
  code: 200,
  message: 'Success',
  ...(response || {}),
});
const DataExist = (response?: ShortResponse): Response => ({
  success: true,
  code: 409,
  message: 'This data exists',
  ...(response || {}),
});

export { NotFound, BadArguments, Ok, InternalError, DataExist, Unauthorized };
