import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const logger = require('../utilities/logger')('logController');

const attachMedia = async (req, res) => {
  //logger.log('info', 'attachMedia: %j', req.url);
  const filename = req.file.filename;
  //console.log('FILENAME ====================================', req.file.filename);
  //console.log('req.username = ', req.username);
  //console.log('req.params.postid = ', req.params.postid)
  //console.log('req ====================================================================================== ', req);
  const media = await MediaModel.save({
    postid: req.params.postid,
    username: req.body.username,
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

const getMediaByPostId = async (req, res) => {
console.log('req.params.postid = ', req.params.postid)
const media = await MediaModel.getMediaByPostId(req.params.postid);
res.status(200).send({
  payload: {
    media
  }
});
}


export { attachMedia, getMediaByPostId };
