import * as CategoryModel from '../models/CategoryModel';
import AppError from '../errors/AppError';


const logger = require('../utilities/logger')('logController');

const getCategoryList = async (req, res) => {
  try {
    logger.log('debug', 'register: %j', req.body);
    const categoryList = await CategoryModel.getCategoryList().catch(error => {
     new AppError(error.message, 400);
    });
    console.dir(categoryList);
    logger.log('info', `Successfully fetched categoryList: `);
    res.status(200).send({ payload: { message: 'Fetched categoryList : ', 
    categoryList} });
  } catch (error) {
    console.log(error);
  }
}

const updateCategoryList = async (req, res) => {
  try {
    const category = req.body.category;
    logger.log('debug', 'register: %j', req.body);
     const categoryDocument = await CategoryModel.getCategoryList().catch(error => {
      new AppError(error.message, 400);
    });
    console.log('categoryDocument - ', categoryDocument );

    if (categoryDocument instanceof Array) { 
      const filterResult = categoryDocument.filter((categoryItem) => { //check how many times provided category is in the DB
        if (categoryItem.categoryName === category) {
          return categoryItem;
        }
      });
    if (filterResult.length === 1) { //when category exists just once - return it
      return filterResult;
    } 
    if (filterResult.length === 0) { //if category doesn't exist, add it to the category list
      const newCategoryList = await CategoryModel.save({categoryName : category});
      return newCategoryList;
    }
    if (filterResult.length > 1) {
      //hopefully this doesn't happen.
      throw new Error ('There are multiple categories with the same name in the DB!');
    }
    }

    //if categories exist

    console.log(category);
    
    throw new Error (`categoryDocument is not instance of Array`);
  } catch(error) {
    console.log(error);
  }
 
}

/* 
if(categoryDocument != null) {
      const categoryList = categoryDocument[0].categoryList;
      if (!categoryList === []) {
        if (!checkForOccurrences(categoryList, category)) {
          categoryList.push(category);
          const newCategoryList = await CategoryModel.save({_id : categoryDocument[0]._id,
          categoryList : newCategoryList});
          return newCategoryList;
      } 
      
    }
    logger.log('info', `Successfully fetched categoryList: ${categoryList}`);
    } else {
      const newCategoryList = await CategoryModel.save({
        categoryList : });
    }
*/

export { getCategoryList, updateCategoryList };