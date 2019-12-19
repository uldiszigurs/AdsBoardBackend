import AppError from '../errors/AppError';
import * as PostModel from '../models/PostModel';
import {addComment as addCommentMethod} from '../models/PostModel';

const logger = require('../utilities/logger')('logController');

const getCommentsByPostId = async (req, res) => {
  logger.log('debug', 'getCommentsByPostId: %j', req.body);
  const comments = await CommentModel.getCommentsByPostId(req.params.postid).catch(error => { 
    new AppError(error.message, 400);
  });
  return {
    message: comments,
    statusCode: 200
  };
};

const getCommentById = async (req, res) => {
  logger.log('debug', 'getCommentById: %j', req.body);
  const comment = await CommentModel.getCommentById(req.params.commentid).catch(error => { 
    new AppError(error.message, 400);
  });
  console.log('message: comment =========== ', comment);
  return {
    message: comment,
    statusCode: 200
  };
};

const addComment = async (req, res) => {
  try {
    //console.log(`req.params.postid = `, req.params.postid);
    logger.log('debug', 'addComment: %j', req.body);
    const postById = await addCommentMethod(req.params.postid, req.body);
    //console.log('POSTBYID - ', postById);
    logger.log('info', `Successfully added comment to post : ${postById._id} with _id : ${postById.comments[postById.comments.length - 1]._id}`);
      return ({
        data: postById.comments[postById.comments.length - 1],  //return last added comment
        statusCode: 200
      });
    }
  catch(error) {
    console.log(error);
  }
  
  
};

export { getCommentsByPostId, addComment, getCommentById };
