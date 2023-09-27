import multer from 'multer';
import path from 'path';
// multer config indicate where to store file and wich name to use

const destination = path.resolve('tempFiles'); // path to folder from  project root

const storage = multer.diskStorage({
  destination,

  filename: function (req, file, cb) {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`; // creat uniqe file name
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const limits = {
  fieldSize: 1024 * 1024 * 5, //Max field value size (in bytes)
};
const upload = multer({ storage, limits });

export default upload;
