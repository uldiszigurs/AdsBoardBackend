const logger = require('../utilities/logger')('errorHandler');
//as defined in doccumentation, ErrorHandler must has 4 parameters, it's how it differs from being a middleware I believe

const defaultErrorHandler = (error, req, res, next) => {
  logger.log('error', `${error.name} : Status =  ${error.status} Error message =  ${error.message}`);
  console.log(error);
  res.status(error.status).send({ error: error.message });
};

export default defaultErrorHandler;
