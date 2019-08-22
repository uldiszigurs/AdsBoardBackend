import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, unique: false, required: true },
    username: { type: String, unique: false, required: true },
    postId: { type: String, unique: false, required: true },
  },
  { timestamps: true },
);
//message = content of comment, username = posted by X user, postId = id of 

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();
const getCommentsByPostId = async mediaId => CommentModel.find({ mediaId });

export { save, getCommentsByPostId, commentSchema };
