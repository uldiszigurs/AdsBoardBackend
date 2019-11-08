import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique: false, required: true },
    postIds : {type: Array, unique: false, required: true}
  },
  { timestamps: false }, //no need for timestamps, 
  //worst case time updated/created could be fetched from parent
);


const CategoryModel = mongoose.model('Category', categorySchema);

const save = async model => new CategoryModel(model).save();
const getCategoryList = async () => CategoryModel.find();


export { save, getCategoryList, categorySchema};
