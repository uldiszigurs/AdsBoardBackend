import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    postid: { type: String, unique: false, required: true },
    username: { type: String, unique: false, required: true },
    message: { type: String, trim: true, unique: false, required: true },
  },
  { timestamps: true },
);
//message = content of comment, username = posted by X user, postId = id of 

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();
const getCommentsByPostId = async (postid) => CommentModel.find({postid});


export { save, getCommentsByPostId, commentSchema };
