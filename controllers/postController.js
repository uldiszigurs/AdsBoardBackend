//import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
//import { UPLOAD_FOLDER } from '../consts/webConsts';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');

const addPost = async (req, res) => {
  try {
  logger.log('debug', 'register: %j', req.body);
  console.log('I WAS EXECUTED, addPost before .save');
  await PostModel.save({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,

  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Successfully added post: ${req.body}`);
  res.status(200).send({ payload: { message: 'Added post : ', //FIXME: 201
  username: req.body.username,
  title: req.body.title,
  description: req.body.description,} });
  }
  catch (error) {
    console.log(error);
  }
};
const getAllPosts = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  const posts = await PostModel.getAllPosts().catch(error => {
    new AppError(error.message, 400);
  });
  logger.log('info', `Successfully fetched: ${req.body.userName}`);
  res.status(200).send({ payload: { message: 'Fetched posts : ', 
  posts} });
}

export { addPost, getAllPosts };
try {
  
} catch (error) {

}