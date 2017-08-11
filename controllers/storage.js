import config from '../config';
import fetch from 'node-fetch'
import uuidV1 from 'uuid/v1';
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

const { login, password, container } = config.storage;

// REVIEW: 

export const loadImage = (image, ext) => {
  return new Promise((resolve, reject) => {
    if (!image || !ext) return;

    const base64Data = image.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/jpg;base64,/, "");
    let bufferData = new Buffer(base64Data, 'base64');

    getAccess()
      .then(access => {
        compress(bufferData)
          .then(compressedBuffer => {
            load(access, compressedBuffer, ext)
              .then(url => resolve(url))
          })
      })
  });

}

const getAccess = () => {
  return new Promise((resolve, reject) => {
    fetch('https://auth.selcdn.ru/', {
      headers: {
        'X-Auth-User': login,
        'X-Auth-Key': password
      }
    })
      .then(res => {
        resolve({
          token: res.headers._headers['x-auth-token'][0],
          url: res.headers._headers['x-storage-url'][0]
        })
      })
  });
}

const compress = png => {
  return new Promise((resolve, reject) => {

    imagemin.buffer(png, {
      plugins: [
        imageminJpegRecompress(),
        imageminPngquant({quality: '65-80'})
      ]
    })
    .then(buffer => {
      resolve(buffer);
    });

  });
}

const load = ({ token, url }, bufferData, ext) => {
  return new Promise((resolve, reject) => {
    const name =`${uuidV1()}.${ext}`;

    fetch(`${url}${container}/${name}`, {
      method: 'PUT',
      headers: {
        'X-Auth-Token': token,
        'Content-Lenght': bufferData.length
      },
      body: bufferData
    })
      .then(res => {
        if (res.status === 201) {
          resolve(`${url + container}/${name}`);
        }
      })
      .catch(err => {
        console.log(err);
      })
  });
}
