import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const logger = require('../utilities/logger')('logController');

const addPost = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  await PostModel.save({
    username: req.body.username,
    title: req.body.title,
    description: req.body.path,
   
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Successfully added post: ${req.body.userName}`);
  res.status(200).send({ payload: { message: 'Added post : ', username: req.body.username,
  title: req.body.title,
  path: req.body.path,} });
};

export { addPost };
