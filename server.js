import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import index from './routes/index';
import './utilities/dotenv';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import {dbConnection, MongoStore} from './utilities/dbConnection';
const logger = require('./utilities/logger')('server');



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
app.use(`/api/v${process.env.API_VERSION}`, index);
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;


app.listen(port, host, () => {
    logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
  });