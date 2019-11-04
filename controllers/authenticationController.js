import jwt from 'jsonwebtoken'; //https://www.npmjs.com/package/jsonwebtoken
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utilities/logger')('logInController');

const register = async (req, res) => {
  let error;
  logger.log('debug', 'register: %j', req.body);
  const registeredUser = await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    rehashedPassword: req.body.rehashedPassword,
  }).catch(catchedError => {
    error = catchedError;
    //throw new AppError(error.message, 400); should log error and return it to client rather than crashing
  });
  logger.log('info', `Successfully registered: ${registeredUser.username}`);
  return {
    data : registeredUser,
    statusCode: 200, 
    hasError: error
  };
};

const logIn = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const user = await UserModel.getUserByEmail(req.body.email);
  if (user) {
    const isPasswordsEqual = await UserModel.comparePassword({
      userPassword: req.body.hashedPassword,
      rehashedPassword: user.rehashedPassword,
    });
    if (isPasswordsEqual) {
      const token = jwt.sign(
        {
          data: { username: user.username },
        },
        process.env.JWT_SECRET,
        { expiresIn: "50h" }, 
      );
      logger.log('info', `Successfully logged in : ${user.username}`);
      return {
        data : token,
        statusCode: 200
      };
    }
  } else {
    logger.log('debug', 'Login failed');
    throw new AppError('Wrong user credentials!', 400);
  }
};

export { register, logIn };
