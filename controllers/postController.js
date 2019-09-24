//import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import * as CategoryModel from '../models/CategoryModel';
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
  res.status(201).send({ payload: { message: 'Added post : ',
    savedDocument} });
  }
  catch (error) {
    throw new AppError(error.message, 400);
  }
};

const getAllPosts = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  const posts = await PostModel.getAllPosts().catch(error => {
    new AppError(error.message, 400);
  });
  logger.log('info', `Successfully fetched all posts: `);
  res.status(200).send({ payload: { message: 'Fetched all posts : ', 
  posts} });
}

const getPostById = async (req, res) => {
  try {
    const _id = req.params.postid;
    //console.log('req.params = ', req.params);
    const post = await PostModel.getPostById(_id).catch(error => { 
      new AppError(error.message, 400);
    });
    res.status(200).send({ payload: { message: 'Fetched post (by _Id): ', 
    post} });
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
    res.status(200).send({ payload: { message: 'Fetched posts (by username) : ', 
    posts} });
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

    res.status(200).send({ payload: { message: 'Fetched post (by category): ', 
    posts} });
  } catch (error) {
      throw new AppError(error.message, 400);
  }
}




export { addPost, getAllPosts, getPostById, getPostsByUser, getPostsByCategory };
//FIXME: addComment export.