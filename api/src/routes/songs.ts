import { Router } from 'express';

import * as SongController from '@controller/song.controller';

const SongRouter = Router();

export const SONG_ROUTE_BASE_PATH = '/songs';

SongRouter.get('', SongController.getSongs);

export default SongRouter;
