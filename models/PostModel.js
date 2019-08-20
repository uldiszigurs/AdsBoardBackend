import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'; //used for hashing password, comparing hashes

const PostSchema = new mongoose.Schema({
    title : { type: String, trim: true, unique: false, required: true },
    createdByUser : { type: String, unique: false, required: true },
    media: {
        contentId: { type: String, unique: true, required: true },
        path: { type: String, unique: true, required: true },
    },
    
}, { timestamps: { createdAt: true, updatedAt: true } });


const PostModel = mongoose.model('Post', PostSchema);

const getPostById = async _id => PostModel.findById({ _id });
const getPostByUser = async username => PostModel.findOne({ username });
const save = async model => new PostModel(model).save();
const getRandomPosts = async () => PostModel.find();
const getPostsByUser = async () => PostModel.find({ _id }); //TODO: careful


export { getPostById, getPostByUser, getRandomPosts, save, getPostsByUser };
