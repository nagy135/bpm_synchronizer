import { Request } from 'express';
import * as path from 'path';
import multer from 'multer';

const IMAGE_MAX_SIZE = 8389000;

const multerFileFilter: any = (req: Request, file: any, callback: any) => {
  const ext: string = path.extname(file.originalname);
  if (
    file &&
    ext !== '.png' &&
    ext !== '.jpg' &&
    ext !== '.gif' &&
    ext !== '.jpeg' &&
    file.mimetype.slice(0, 5) !== 'image'
  ) {
    throw Error();
  }
  callback(null, true);
};

const multerUploader: any = multer({
  fileFilter: multerFileFilter,
  limits: {
    fileSize: IMAGE_MAX_SIZE,
  },
});

export default multerUploader;
