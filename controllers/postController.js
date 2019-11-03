//import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
//import { UPLOAD_FOLDER } from '../consts/webConsts';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');

const addPost = async (req, res) => {
  const {username, title, description, category} = req.body;
  try {
  logger.log('debug', 'register: %j', req.body);
   const savedDocument = await PostModel.save({
    username: username,
    title: title,
    description: description,
    category: category
  });
  logger.log('info', `Successfully added post with _id : ${savedDocument._id}`);
  return savedDocument;
  }
  catch (error) {
    throw new AppError(error.message, 400);
  }
};

const getAllPosts = async (req, res) => {
  //logger.log('debug', 'register: %j', req.body);
  const posts = await PostModel.getAllPosts().catch(error => {
    new AppError(error.message, 400);
  });
  logger.log('info', `Successfully fetched all posts: `);
  return posts;
}

const getPostById = async (req, res) => {
  try {
    const _id = req.params.postid;
    console.log('req.params = ', req.params);
    const post = await PostModel.getPostById(_id).catch(error => { 
      new AppError(error.message, 400);
    });
    console.log('post - ', post);
    return post;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
 
}

const getPostsByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const posts = await PostModel.getPostsByUser(username).catch(error => { 
      new AppError(error.message, 400);
    });
    return posts;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
}

const getPostsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await PostModel.getPostsByCategory(category).catch(error => { 
      new AppError(error.message, 400);
    });
    return posts;
  } catch (error) {
      throw new AppError(error.message, 400);
  }
}
const updatePost = async (req, res) => {
  try {
    console.log(req.body);
    const {username, title, description, category} = req.body;
    const postId = req.params.postid;
    const post = await PostModel.updatePostById(postId, {
      username, 
      title, 
      description, 
      category
    }).catch(error => { 
      new AppError(error.message, 400);
    });
    logger.log('info', `Successfully updated post with _id : ${postId}`);
    return post;
  } catch(error) {
    throw new AppError(error.message, 400);
  }
}


export { addPost, getAllPosts, getPostById, getPostsByUser, getPostsByCategory, updatePost };