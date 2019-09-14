import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import index from './routes/index';
import authenticationRouter from './routes/authenticationRouter';
import categoryRouter from './routes/categoryRouter';
import './utilities/dotenv';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import postRouter from './routes/post';
import { dbConnection, MongoStore } from './utilities/dbConnection';
const logger = require('./utilities/logger')('server');

/* 
TODO: use _id to search user content not username
*/


const app = express();

dbConnection();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

app.use(`/api/v${process.env.API_VERSION}/authentication`, authenticationRouter);
app.use(`/api/v${process.env.API_VERSION}/post`, postRouter)
app.use(`/api/v${process.env.API_VERSION}/category`, categoryRouter)


//app.use(`/api/v${process.env.API_VERSION}/media`, authenticate, media);
app.use(`/api/v${process.env.API_VERSION}`, index); //FIXME: Careful with path sequence
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

/* 
User => Post => media, title, otherinfo => Comments
UserSchema : email, username, password 
PostSchema : postedByUsername, postTitle, PostInfo(something else potentially), createdAt, updatedAt
CommentSchema : postedByUsername, commentBody, createdAt, updatedAt
MediaSchema : mediaAttachedToPostId, Path


*/
app.listen(port, host, () => {
    logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
  });