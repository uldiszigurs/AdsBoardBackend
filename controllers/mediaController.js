import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const logger = require('../utilities/logger')('logController');

const attachMedia = async (req, res) => {
  //logger.log('info', 'attachMedia: %j', req.url);
  console.log('req = ',req);
  const { reqBody } = req;
  console.log('reqBody = ',reqBody);
  const { file: { filename } } = req;
  console.log('file.filename = ', file.filename);
  console.log('FILENAME ====================================', filename);
  const media = await MediaModel.save({
    postId: req.params.postid,
    username: reqBody.username,
    path: `/${UPLOAD_FOLDER}/${filename}`,
  });

  res.status(200).send({
    payload: {
    /*contentId: media.id,
      path: `/${UPLOAD_FOLDER}/${filename}`, */
      media
    },
  });
};


export { attachMedia };
