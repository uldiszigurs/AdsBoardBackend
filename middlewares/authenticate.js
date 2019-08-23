import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthenticateError';
import { getUserByName } from '../models/UserModel';

const logger = require('../utilities/logger')('authenticate');

const jsonWebTokenValidate = token =>
  new Promise(resolve => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      resolve(decodedToken);
    });
  });

const authenticate = async (req, res, next) => {
  // TODO: Remove, used for dev purposes
  /* if (process.env.SKIP_AUTH) {
    console.log('AUTHENTICATE SKIPPED! Check authenticate middleware, .ENV')
    return next();
  } */

  const { authorization } = req.headers;
  console.log('authorization = ', authorization);
  let token;
  if (authorization) {
    [, token] = authorization.split(' ');
  }

  if (token) {
    const decodedToken = await jsonWebTokenValidate(token);

    if (decodedToken && decodedToken.data && decodedToken.data.username) {
      const { username } = decodedToken.data;
      const user = await getUserByName(username);
      if (user) {
        logger.log('debug', `User: ${username} was successfully authenticated`);
        req.user = user;
        return next();
      }
    }
    return next(new AuthError('No such user, token is invalid'));
  }
  return next(new AuthError('No token provided'));
};

export default authenticate;
