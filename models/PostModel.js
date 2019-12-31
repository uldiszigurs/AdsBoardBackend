import mongoose from 'mongoose';
//import mediaSchema from './mediaModel';
//trim is for useless whitespace elimination at the end & start (not sure about middle)
const commentSchema = new mongoose.Schema(
    {
      //postid: { type: String, unique: false, required: true }, //not needed by current schema definition
      username: { type: String, trim: true, unique: false, required: true },
      message: { type: String, trim: true, unique: false, required: true },
    },
    { timestamps: true },
  );
  //message = content of comment, username = posted by X user, postId = id of 

  const additionalMedia = new mongoose.Schema(
    {
      path: { type: String, unique: true, required: true, trim: true },
    },
    { timestamps: true },
  );
  const mediaSchema = new mongoose.Schema(
    {
      mainPath: { type: String, unique: true, required: true, trim: true }, //path represents relative path & name of the media file
      otherPaths: { type : [additionalMedia], unique: false, required: false, trim: true  }
    },
    { timestamps: true },
  );
  

const PostSchema = new mongoose.Schema({
    username : { type: String, trim: true, unique: false, required: true, uppercase: true}, //user who made the post
    title : { type: String, trim: true, unique: false, required: true },
    description : { type: String, trim: true, unique: false, required: true },
    category : {type : String, trim: true,  unique: false, required: false, default: 'other'},
    comments : {type: [commentSchema], required: false},
    media : {type: mediaSchema, trim: true,  unique: false, required: false} //images, gifs, potentially videos
    
    //media : { type: mediaSchema, required: false }
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
const addComment = async (parentPostId, comment) => { 
  try {
    const parentDocument = await PostModel.findOneAndUpdate({ _id: parentPostId },
    {
      $push : {
        comments: comment
      }
    },
    {new : true} );
    return parentDocument;
    
  } catch (error) {
    console.log(error);
  }
  
}
 //comment consists of {username, message} 




export { getPostById, getPostsByUser, getAllPosts, save, getPostsByCategory, updatePostById, deletePostById, addComment};
