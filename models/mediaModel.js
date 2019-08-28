import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    postid: { type: String, unique: false, required: true },
    username: { type: String, unique: false, required: true },
    path: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

const MediaModel = mongoose.model('Media', mediaSchema);

const save = async model => new MediaModel(model).save();
const getMediaById = async id => MediaModel.findOne({ _id: id});
const getMediaByUser = async userName => MediaModel.findOne({ userName });
const getMediaByPostId = async postid => MediaModel.findOne({ postid });


export { save, getMediaById, getMediaByUser, mediaSchema, getMediaByPostId };
