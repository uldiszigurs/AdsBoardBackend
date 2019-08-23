import mongoose from 'mongoose';
//trim is for whitespace elimination-ish
const PostSchema = new mongoose.Schema({
    username : { type: String, unique: false, required: true },
    title : { type: String, trim: true, unique: false, required: true },
    description : { type: String, trim: true, unique: false, required: true },
    category : {type : String, trim: true,  unique: false, required: true, default: 'other'}
    },   
    { timestamps: { createdAt: true, updatedAt: true } });


const PostModel = mongoose.model('Post', PostSchema);

const getPostById = async _id => PostModel.findById({ _id });
const getPostByUser = async username => PostModel.find({ "username" : username }); //FIXME: CAREFUL findone -> find
const save = async model => new PostModel(model).save();
const getAllPosts = async () => PostModel.find();


export { getPostById, getPostByUser, getAllPosts, save, getPostsByUser };
