//import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
//import { UPLOAD_FOLDER } from '../consts/webConsts';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');

const addPost = async (req, res) => {
  const {username, title, description, category} = req.body;
  try {
  logger.log('debug', 'register: %j', req.body);
  console.log('I WAS EXECUTED, addPost before .save');
   const savedDocument = await PostModel.save({
    username: username,
    title: title,
    description: description,
    category: category
  });
  console.log('savedDocument = ', savedDocument);
  /* .catch(error => {
    throw new AppError(error.message, 400);
  }); */
  logger.log('info', `Successfully added post: ${req.body}`); //FIXME: [object Object] output object as string directly (ATM)
  //logger.log('info', 'Successfully added post: ', req.body);
  console.log(req.body);
  res.status(200).send({ payload: { message: 'Added post : ', //FIXME: 201
    savedDocument} });
    console.log('req.url :', req.url);
  }
  catch (error) {
    console.log(error);
    throw new AppError(error.message, 400);
  }
};
const getAllPosts = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  const posts = await PostModel.getAllPosts().catch(error => {
    new AppError(error.message, 400);
  });
  logger.log('info', `Successfully fetched all posts: ${req.body.userName}`);
  res.status(200).send({ payload: { message: 'Fetched all posts : ', 
  posts} });
}



export { addPost, getAllPosts };
try {
  
} catch (error) {

}