import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryList: { type: Array, unique: false, required: true },
  },
  { timestamps: false },
);


const CategoryModel = mongoose.model('Category', categorySchema);

const save = async model => new CategoryModel(model).save();
const getCategoryList = async () => CategoryModel.findOne();


export { save, getCategoryList, categorySchema};
