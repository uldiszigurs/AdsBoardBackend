import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const logger = require('../utilities/logger')('logController');

const attachMedia = async (req, res) => {
  logger.log('info', 'attachMedia: %j', req.body);
  console.log('req = ',req);
  const { user } = req;
  const { file: { filename } } = req;

  const media = await MediaModel.save({
    username: user.username,
    path: `/${UPLOAD_FOLDER}/${filename}`,
  });

  res.status(200).send({
    payload: {
      contentId: media.id,
      path: `/${UPLOAD_FOLDER}/${filename}`,
    },
  });
};


export { attachMedia };
