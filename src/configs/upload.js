import { path } from 'path';
import multer from 'multer';
import crypto from 'crypto';

export const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
export const UPLOADS_FOLDER = path.resolve(__dirname, 'upload');

export const MULTER = {
  Storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
