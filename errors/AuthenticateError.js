import AppError from './AppError';

class AuthenticateError extends AppError {
  constructor(message) {
    super(message || 'Authentication failed', 401);
  }
}

export default AuthenticateError;
