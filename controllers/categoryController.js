
import * as CategoryModel from '../models/CategoryModel';
import AppError from '../errors/AppError';
import checkForOccurrences from '../utilities/checkForOccurrences';

const logger = require('../utilities/logger')('logController');

const getCategoryList = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
   const categoryList = await CategoryModel.getCategoryList().catch(error => {
    new AppError(error.message, 400);
  });
  logger.log('info', `Successfully fetched categoryList: `);
  res.status(200).send({ payload: { message: 'Fetched categoryList : ', 
  categoryList} });
}

const updateCategoryList = async (req, res) => {
  const {category} = req.body.category;
  logger.log('debug', 'register: %j', req.body);
   const categoryDocument = await CategoryModel.getCategoryList().catch(error => {
    new AppError(error.message, 400);
  });
  const categoryList = categoryDocument[0].categoryList;
  if (!categoryList === []) {
    if (!checkForOccurrences(categoryList, category)) {
      categoryList.push(category);
      const newCategoryList = await CategoryModel.save({_id : categoryDocument[0]._id,
      categoryList : newCategoryList})
    }
  }
  logger.log('info', `Successfully fetched categoryList: ${categoryList}`);
  res.status(200).send({ payload: { message: 'Updated categoryList : ', 
  categoryList : newCategoryList} });
}



export { getCategoryList, updateCategoryList };