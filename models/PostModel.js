import mongoose from 'mongoose';
import commentSchema from './commentModel';
import mediaSchema from './mediaModel';
//trim is for whitespace elimination (smthing like that)
const PostSchema = new mongoose.Schema({
    username : { type: String, trim: true, unique: false, required: true, uppercase: true},
    title : { type: String, trim: true, unique: false, required: true },
    description : { type: String, trim: true, unique: false, required: true },
    category : {type : String, trim: true,  unique: false, required: false, default: 'other'},
    comments : {type: [commentSchema], required: false},
    media : { type: mediaSchema, required: false }
    // TODO: default isn't used properly, look for alternative / remove,
    // or combination with required might be the fault
    //FIXME: changed category from requrired:true to required:false
    },   
    { timestamps: { createdAt: true, updatedAt: true } });


const PostModel = mongoose.model('Post', PostSchema);

const getPostById = async _id => PostModel.findById({ _id }); //PROVIDE STRING
const getPostsByUser = async username => PostModel.find({ username });
const getPostsByCategory = async category => PostModel.find({category });
const save = async model => new PostModel(model).save();
const getAllPosts = async () => PostModel.find();
const updatePostById = async ( _id, updatedDocument) => PostModel.findOneAndUpdate(
    { _id }, 
    updatedDocument, 
    {new : true} //return modified document
    );
const deletePostById = async (_id) => PostModel.deleteOne({_id});



export { getPostById, getPostsByUser, getAllPosts, save, getPostsByCategory, updatePostById, deletePostById};
