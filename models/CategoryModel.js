import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryList: { type: Array, unique: false, required: true },
  },
  { timestamps: false },
);


const CategoryModel = mongoose.model('Category', categorySchema);

const save = async model => new CategoryModel(model).save();
const getCategoryList = async () => CategoryModel.findOne(); //FIXME: if conditions is null or undefined, mongoose will send an empty findOne command to MongoDB, which will return an arbitrary document


export { save, getCategoryList, categorySchema};
