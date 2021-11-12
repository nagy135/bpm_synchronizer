import { Router } from 'express';
import multer from 'multer';

import * as SongController from '@controller/song.controller';

const SongRouter = Router();

const upload = multer({ dest: 'uploaded/' });

export const SONG_ROUTE_BASE_PATH = '/songs';

SongRouter.get('', SongController.getSongs);
SongRouter.post('/upload', upload.single('song'), SongController.uploadSong);

export default SongRouter;
