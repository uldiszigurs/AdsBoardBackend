const logger = require('../utilities/logger')('errorHandler');

const defaultErrorHandler = (error, req, res, next) => {
  logger.log('error', `${error.name} : Status =  ${error.status} Error message =  ${error.message}`);
  console.log(error);
  res.status(error.status).send({ error: error.message });
};

export default defaultErrorHandler;
