import { NextFunction, Request, Response } from 'express';

import { RESPONSE_STATUS_OK, STATUS_HTTP_OK } from '@utils/http-codes';
import { TApplicationError } from '@utils/app-errors';

import SongHandler from '@handler/songs';

/**
 * lists all songs, paginated
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await SongHandler.getSongs(req.query);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};
