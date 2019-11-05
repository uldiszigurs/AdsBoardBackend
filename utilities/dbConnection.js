import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import './dotenv';
const logger = require('./logger')('server');

const MongoStore = mongo(session);
const dbConnection = () => {
  mongoose.Promise = global.Promise; 
  mongoose.connect(process.env.MONGODB_URI, 
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
  });
  mongoose.connection.on('error', () => {
    logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  });
  mongoose.connection.once('open', () => {
    logger.log('info', 'MongoDB has been connected.');
    //mongoose.connection.dropCollection('posts'); this was for hotfix when there were faulty documments in collection
  });
}

export {MongoStore, dbConnection};