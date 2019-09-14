
import * as PostModel from '../models/PostModel';
import AppError from '../errors/AppError';

const logger = require('../utilities/logger')('logController');

const getCategoryList = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
   const categoryList = await CategoryModel.getCategoryList().catch(error => {
    new AppError(error.message, 400);
  });
  //const categoryList = ['test1', 'test2', 'test3', 'aaaaaa', 'ccccc', 'bbbbbbbbg3524'];
  logger.log('info', `Successfully fetched categoryList: `);
  res.status(200).send({ payload: { message: 'Fetched categoryList : ', 
  categoryList} });
}

const updateCategoryList = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  /* const categoryList = await CategoryModel.getCategoryList().catch(error => {
    new AppError(error.message, 400);
  }); */
  const categoryList = ['test1', 'test2', 'test3', 'aaaaaa', 'ccccc', 'bbbbbbbbg3524'];
  logger.log('info', `Successfully fetched categoryList: `);
  res.status(200).send({ payload: { message: 'Fetched categoryList : ', 
  categoryList} });
}



export { getCategoryList, updateCategoryList };