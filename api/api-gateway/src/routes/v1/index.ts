import { Router } from 'express';

import SongRouter, { SONG_ROUTE_BASE_PATH } from '@routes/songs';

const RouterV1 = Router();

RouterV1.use(SONG_ROUTE_BASE_PATH, SongRouter);

export default RouterV1;
