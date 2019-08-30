import mongoose from 'mongoose';
//trim is for whitespace elimination (smthing like that)
const PostSchema = new mongoose.Schema({
    username : { type: String, unique: false, required: true },
    title : { type: String, trim: true, unique: false, required: true },
    description : { type: String, trim: true, unique: false, required: true },
    category : {type : String, trim: true,  unique: false, required: true, default: 'other'} // TODO: default isn't used properly, look for alternative / remove,
    // or combination with required might be 
    },   
    { timestamps: { createdAt: true, updatedAt: true } });


const PostModel = mongoose.model('Post', PostSchema);

const getPostById = async _id => PostModel.findById({ _id }); //CAREFUL! PROVIDE STRING.
const getPostsByUser = async username => PostModel.find({ username }); //FIXME: CAREFUL! PROVIDE STRING.
const getPostsByCategory = async category => PostModel.find({category });
const save = async model => new PostModel(model).save();
const getAllPosts = async () => PostModel.find();



export { getPostById, getPostsByUser, getAllPosts, save, getPostsByCategory};
