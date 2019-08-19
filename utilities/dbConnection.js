import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';

import './dotenv';
const logger = require('./logger')('server');

const MongoStore = mongo(session);
mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has been connected.'));

export default MongoStore;