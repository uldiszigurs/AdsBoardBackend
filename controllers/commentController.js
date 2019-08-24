import * as CommentModel from '../models/CommentModel';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');

const getCommentsByPostId = async (req, res) => {
  console.log('I was executed, postId = ', req.params.postid);
  logger.log('debug', 'getCommentsByPostId: %j', req.body);
  const comments = await CommentModel.getCommentsByPostId(req.params.postid);
  res.status(200).send({message : "Fetched all comments by post id : ", 
  payload: { comments } });
};

const getCommentById = async (req, res) => {
  console.log('I was executed, postId = ', req.params.commentid);
  logger.log('debug', 'getCommentById: %j', req.body);
  const comment = await CommentModel.getCommentById(req.params.commentid);
  res.status(200).send({message : "Fetched comment by id : ", 
  payload: { comment } });
};

const addComment = async (req, res) => {
  console.log('I WAS EXECUTED (addComment).');
  logger.log('debug', 'addComment: %j', req.body);
  const comment = await CommentModel.save({
    postid: req.params.postid,
    username: req.body.username,
    message: req.body.message,
  }).catch(error => {
    console.log('I WAS EXECUTED 2.');
    throw new AppError(error.message, 400);
  });
  res.status(201).send({message : "Added comment to post : ",
  payload: { comment }});
};

export { getCommentsByPostId, addComment, getCommentById };
