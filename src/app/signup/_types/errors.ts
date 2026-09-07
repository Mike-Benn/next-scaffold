import { authClient } from '@/auth/auth-client';

type SignUpErrorCodeToFieldTypes = Partial<
  Record<keyof typeof authClient.$ERROR_CODES, 'email' | 'password' | 'invalid'>
>;

type SignUpErrorCodeToMessageTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    | 'Email already in use, please try a different one.'
    | 'Password must be between 12 and 64 characters.'
    | 'Please check that your email and password are filled in correctly.'
  >
>;
export const signUpErrorCodesToFields = {
  USER_ALREADY_EXISTS: 'email',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'email',
  PASSWORD_TOO_SHORT: 'password',
  PASSWORD_TOO_LONG: 'password',
  VALIDATION_ERROR: 'invalid',
} satisfies SignUpErrorCodeToFieldTypes;

export const signUpErrorCodesToMessages = {
  USER_ALREADY_EXISTS: 'Email already in use, please try a different one.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Email already in use, please try a different one.',
  PASSWORD_TOO_LONG: 'Password must be between 12 and 64 characters.',
  PASSWORD_TOO_SHORT: 'Password must be between 12 and 64 characters.',
} satisfies SignUpErrorCodeToMessageTypes;
