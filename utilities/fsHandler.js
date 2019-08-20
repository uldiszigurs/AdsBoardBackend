import fs from 'fs';

const createFolderIfNotExists = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        if (err.code === 'EXIST') { //TODO: 
          resolve();
        } else {
          reject(err);
        }
      } else {
        resolve();
      }
    });
  });
};

export { createFolderIfNotExists };
