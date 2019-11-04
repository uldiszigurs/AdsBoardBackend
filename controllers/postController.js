//import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
//import { UPLOAD_FOLDER } from '../consts/webConsts';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');
//if failed .get request return 500 (internal server error)
//if failed .post request return 403 (forbidden) | 500 (internal server error) if failed
//if successful .post return 201
//if successful .put return 200
//if successful .delete return 200

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
  return {
    data: savedDocument,
    statusCode: 201};
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
  return {
    data: posts,
    statusCode: 200
  };
}

const getPostById = async (req, res) => {
  try {
    const _id = req.params.postid;
    console.log('req.params = ', req.params);
    const post = await PostModel.getPostById(_id).catch(error => { 
      new AppError(error.message, 400);
    });
    console.log('post - ', post);
    return {
      data: post,
      statusCode: 200
    };
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
    return {
      data: posts,
      statusCode: 200
    };
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
    return {
      data: posts,
      statusCode: 200
    };
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
    return {
      data: post,
      statusCode: 200
    };
  } catch(error) {
    throw new AppError(error.message, 400);
  }
}


export { addPost, getAllPosts, getPostById, getPostsByUser, getPostsByCategory, updatePost };