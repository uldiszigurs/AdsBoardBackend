import mongoose from 'mongoose';
const additionalMedia = new mongoose.Schema(
  {
    path: { type: String, unique: true, required: true, trim: true },
  },
  { timestamps: true },
);
const mediaSchema = new mongoose.Schema(
  {
    postid: { type: String, unique: false, required: true, trim: true },
    username: { type: String, unique: false, required: true, trim: true },
    mainPath: { type: String, unique: true, required: true, trim: true },
    otherPaths: [additionalMedia]
  },
  { timestamps: true },
);

const MediaModel = mongoose.model('Media', mediaSchema);

const save = async model => new MediaModel(model).save();
const getMediaById = async _id => MediaModel.findOne({_id});
const getMediaByUser = async username => MediaModel.find({ username });
const getMediaByPostId = async postid => MediaModel.findOne({ postid });


export { save, getMediaById, getMediaByUser, mediaSchema, getMediaByPostId };
