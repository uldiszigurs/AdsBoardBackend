import * as CommentModel from '../models/CommentModel';
import AppError from '../errors/AppError';
import * as PostModel from '../models/PostModel';

const logger = require('../utilities/logger')('logController');

const getCommentsByPostId = async (req, res) => {
  logger.log('debug', 'getCommentsByPostId: %j', req.body);
  const comments = await CommentModel.getCommentsByPostId(req.params.postid).catch(error => { 
    new AppError(error.message, 400);
  });
  return {
    data: comments,
    statusCode: 200
  };
};

const getCommentById = async (req, res) => {
  logger.log('debug', 'getCommentById: %j', req.body);
  const comment = await CommentModel.getCommentById(req.params.commentid).catch(error => { 
    new AppError(error.message, 400);
  });
  return {
    data: comment,
    statusCode: 200
  };
};

const addComment = async (req, res) => {
  logger.log('debug', 'addComment: %j', req.body);
  const postById = await PostModel.getPostById(req.params.postid);
  if (postById != null) { //return 201 code.
    const comment = await CommentModel.save({
      postid: req.params.postid,
      username: req.body.username,
      message: req.body.message,
    }).catch(error => {
      throw new AppError(error.message, 400);
    });
    return {
      data: comment,
      statusCode: 200
    };
  } else { //return 403 for denied access because the main resource doesn't exist / 400 + custom message 

  }
  
};

export { getCommentsByPostId, addComment, getCommentById };
